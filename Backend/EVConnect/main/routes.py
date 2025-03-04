from flask import render_template, request, Blueprint, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_required, current_user
from flask_login import LoginManager
from EVConnect.models import db, Community, Question

from flask import Flask, request
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

from EVConnect.models import db, User, Community

main = Blueprint('main', __name__)
login_manager = LoginManager()

@main.route('/community/<int:community_id>/questions', methods=['GET'])
@login_required
def get_community_questions(community_id):
    # Get the community by ID
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404

    # Get all questions for the community
    questions = Question.query.filter_by(community_id=community_id).all()

    # Format questions for response
    question_list = [{'id': q.id, 'content': q.content, 'created_at': q.created_at} for q in questions]

    return jsonify({'questions': question_list}), 200



# Route to get all communities (for selection page)
@main.route('/communityselect', methods=['GET'])
def get_communities():
    communities = Community.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'area': c.area} for c in communities])

# User signup route
@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# User login route
@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
# Join community route (without user validation)
@main.route('/join_community', methods=['POST'])
def join_community():
    # Get the email and community_id from the request
    user_email = request.json.get('user_email')  # using email instead of user_id
    community_id = request.json.get('community_id')
    print()
    print(user_email)
    
    
    
    # Check if community_id is provided
    if not community_id:
        return jsonify({'message': 'Community ID is required'}), 400

    # Get the community by community_id
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404
    

    # Get the user by email (allowing anyone to join, without validation)
    if not user_email:
        return jsonify({'message': 'User email is required'}), 400

    user = User.query.filter_by(email=user_email).first()
    if not user:
        # If user does not exist, we allow the email to still be used, so create a new user.
        new_user = User(username=user_email.split('@')[0], email=user_email, password="")  # create new user with empty password
        db.session.add(new_user)
        db.session.commit()
        user = new_user  # now we have the new user object

    # Add the community to the user's list of communities (no restriction)
    user.communities.append(community)
    db.session.commit()

    return jsonify({
        'message': 'Successfully joined the community',
        'community': {'id': community.id, 'name': community.name, 'area': community.area}
    }), 200


# Route to get communities based on user email
def get_user_communities():
    user_email = current_user.email  # Assuming `current_user` has email as an attribute
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    joined_communities = user.communities
    joined_ids = [c.id for c in joined_communities]
    unjoined_communities = Community.query.filter(Community.id.notin_(joined_ids)).all()

    return jsonify({
        'joined_communities': [{'id': c.id, 'name': c.name, 'area': c.area} for c in joined_communities],
        'unjoined_communities': [{'id': c.id, 'name': c.name, 'area': c.area} for c in unjoined_communities]
    })
