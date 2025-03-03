
from EVConnect import create_app, db

def init_db(app):
    with app.app_context():
        db.create_all()

def main():
    app = create_app()
    init_db(app)
    print("Database initialized.")

if __name__ == "__main__":
    main()
