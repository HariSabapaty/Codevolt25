from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Store hashed passwords
    is_verified = db.Column(db.Boolean, default=False)

    # Relationships
    questions = db.relationship('Question', backref='user', lazy=True)
    answers = db.relationship('Answer', backref='user', lazy=True)
    communities = db.relationship('Community', secondary='user_communities', back_populates="users")
    

    def __repr__(self):
        return f'<User {self.username}>'

class Community(db.Model):
    __tablename__ = 'communities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    area = db.Column(db.String(100), nullable=False)  # e.g., "Los Angeles", "Bay Area"

    # Relationships
    questions = db.relationship('Question', backref='community', lazy=True)
    users = db.relationship('User', secondary='user_communities', back_populates="communities")

    def __repr__(self):
        return f'<Community {self.name}>'

# Association Table for User and Community (Many-to-Many)
user_communities = db.Table('user_communities',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('community_id', db.Integer, db.ForeignKey('communities.id'), primary_key=True)
)

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now()) #When the Question was asked

    # Relationships
    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return f'<Question {self.title}>'

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'community_id': self.community_id,
            'user': self.user,
            'timestamp': self.timestamp,
            'answers': []  # Placeholder — can be linked to an Answer model later
        }

    def __repr__(self):
        return f'<Answer {self.id}>'

class EVUsage(db.Model):
    __tablename__ = 'ev_usage'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, server_default=db.func.current_date())
    distance_traveled_km = db.Column(db.Float, nullable=False)  
    energy_consumed_kwh = db.Column(db.Float, nullable=False)  
    charging_cost = db.Column(db.Float, nullable=False)  

    user = db.relationship('User', backref=db.backref('ev_usage', lazy=True))

    def __repr__(self):
        return f'<EVUsage {self.user_id} - {self.date}>'  

class CO2Savings(db.Model):
    __tablename__ = 'co2_savings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, server_default=db.func.current_date())
    fuel_vehicle_co2 = db.Column(db.Float, nullable=False)  # Estimated CO2 from a fossil fuel vehicle
    ev_co2 = db.Column(db.Float, default=0.0)  # CO2 emissions from EV (usually near zero)
    co2_saved = db.Column(db.Float, nullable=False)  # Computed as fuel_vehicle_co2 - ev_co2  

    user = db.relationship('User', backref=db.backref('co2_savings', lazy=True))

    def __repr__(self):
        return f'<CO2Savings {self.user_id} - {self.date}>'  

class FinancialSavings(db.Model):
    __tablename__ = 'financial_savings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, server_default=db.func.current_date())
    fuel_cost = db.Column(db.Float, nullable=False)  
    ev_cost = db.Column(db.Float, nullable=False)  
    maintenance_savings = db.Column(db.Float, nullable=False)
    tax_benefits = db.Column(db.Float, nullable=False)
    total_savings = db.Column(db.Float, nullable=False)  # Computed field  

    user = db.relationship('User', backref=db.backref('financial_savings', lazy=True))

    def __repr__(self):
        return f'<FinancialSavings {self.user_id} - {self.date}>'  

class EnvironmentalImpact(db.Model):
    __tablename__ = 'environmental_impact'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, server_default=db.func.current_date())
    trees_saved = db.Column(db.Float, nullable=False)  
    air_quality_index_improvement = db.Column(db.Float, nullable=False)  

    user = db.relationship('User', backref=db.backref('environmental_impact', lazy=True))

    def __repr__(self):
        return f'<EnvironmentalImpact {self.user_id} - {self.date}>'  


class Gamification(db.Model):
    __tablename__ = 'gamification'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    badges_awarded = db.Column(db.Text, nullable=True)  # Stores JSON or CSV string of earned badges  
    current_streak = db.Column(db.Integer, default=0)  
    longest_streak = db.Column(db.Integer, default=0)  

    user = db.relationship('User', backref=db.backref('gamification', lazy=True))

    def __repr__(self):
        return f'<Gamification {self.user_id}>'  


class CommunityRankings(db.Model):
    __tablename__ = 'community_rankings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    rank_by_distance = db.Column(db.Integer, nullable=True)  
    rank_by_co2_savings = db.Column(db.Integer, nullable=True)  
    rank_by_savings = db.Column(db.Integer, nullable=True)  

    user = db.relationship('User', backref=db.backref('community_rankings', lazy=True))
    community = db.relationship('Community', backref=db.backref('community_rankings', lazy=True))

    def __repr__(self):
        return f'<CommunityRankings {self.user_id} - {self.community_id}>'  


class FuturePredictions(db.Model):
    __tablename__ = 'future_predictions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    predicted_yearly_savings = db.Column(db.Float, nullable=False)  
    predicted_co2_reduction = db.Column(db.Float, nullable=False)  
    predicted_distance = db.Column(db.Float, nullable=False)  

    user = db.relationship('User', backref=db.backref('future_predictions', lazy=True))

    def __repr__(self):
        return f'<FuturePredictions {self.user_id}>'  
