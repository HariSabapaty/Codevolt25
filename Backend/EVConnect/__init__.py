from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from EVConnect.config import Config


db = SQLAlchemy()


from EVConnect.models import *

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    #Initialisation
    db.init_app(app)
        
    #registering blueprints for various part of the application
    from EVConnect.main.routes import main
    
    app.register_blueprint(main)

    return app