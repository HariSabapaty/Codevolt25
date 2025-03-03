from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from EVConnect.config import Config
from flask_cors import CORS

db = SQLAlchemy()


from EVConnect.models import *

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins='*')
    #Initialisation
    db.init_app(app)
        
    #registering blueprints for various part of the application
    from EVConnect.main.routes import main
    from EVConnect.insights.routes import insights_bp
    
    app.register_blueprint(main)
    app.register_blueprint(insights_bp, url_prefix='/insights')

    return app