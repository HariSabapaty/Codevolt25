# EVConnect: Your Community-Driven Electric Vehicle Platform

## Overview

EVConnect is a web application designed to ease the transition to electric vehicles (EVs) by providing a community-driven platform with resources, discussions, and essential tools. Whether you're a potential EV buyer or an experienced EV owner, EVConnect aims to provide the information and connections you need.

## Features

*   **Community Forums:** Connect with local EV enthusiasts, participate in discussions, ask questions, and share your experiences.
*   **Informational Resource:** Learn about EV comparisons, environmental impact, and charging options
*   **Easy Community Access:** Browse and select communities to join.
*   **Insights:** Data-driven insights and analytics related to EV performance, cost savings, and environmental impact.
*   **Events Scheduling:** Discover and schedule local EV-related events, meetups, and workshops.
*   **Tutorials:** Access tutorials and resources.

## Technologies Used

*   **Frontend:** React
    *   React Bootstrap for UI components
    *   Axios for making API requests
*   **Backend:** Flask (Python)
    *   Flask-SQLAlchemy for database interaction
    *   Flask-CORS for handling Cross-Origin Resource Sharing
*   **Database:** MySQL



## Setup Instructions

1.  **Clone the repository:**

    ```
    git clone [repository_url]
    cd EVConnect
    ```

2.  **Backend Setup:**

    *   Create a virtual environment:

        ```
        python -m venv myenv
        ```

    *   Activate the virtual environment:

        *   **Windows:** `myenv\Scripts\activate`
        *   **macOS/Linux:** `source myenv/bin/activate`

    *   Install the required Python packages:

        ```
        pip install -r requirements.txt
        ```

    *   Configure the database:

        *   Create a MySQL database.
        *   Update the `SQLALCHEMY_DATABASE_URI` in `EVConnect/config.py` with your database credentials.

    *   Run the Flask application:

        ```
        python run.py
        ```

3.  **Frontend Setup:**
    *   Install Node Modules

        ```
        cd Frontend
        npm install
        ```
    *   Start the react frontend

        ```
        npm start
        ```

## Environment Variables

*   `SECRET_KEY`:  A secret key used for signing session cookies.  Set this to a random, long string in your production environment.
*   `DATABASE_URL`: The URI for connecting to your MySQL database.

You can set these environment variables directly in your terminal or in a `.env` file.

## Database Initialization

The `db_utils.py` file provides functions to initialize the database with default data (e.g., pre-defined communities).
*To setup ensure the file has been set up properly

## API Endpoints

*   `/signup`: Registers a new user.
*   `/login`: Authenticates an existing user.
*   `/communityselect`: Retrieves all communities.
*   `/join_community`: Links a user to a community.
*   `/community/<community_name>`:Retrieves a community through its name.
*   `/user_communities`: Retrieves a community related to the user



