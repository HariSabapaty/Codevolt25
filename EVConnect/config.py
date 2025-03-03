import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    #Change the database name in env variables when working with new project
    #mysql+pymysql://your_username:your_password@localhost/your_database_name
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')

    
    # MAIL_SERVER = 'smtp.googlemail.com'
    # MAIL_PORT = 587
    # MAIL_USE_TLS = True
    # MAIL_USERNAME = os.environ.get('EMAIL_USER')
    # MAIL_PASSWORD = os.environ.get('EMAIL_PASS')
    
