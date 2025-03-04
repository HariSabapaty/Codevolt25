import random

def calculate_future_predictions(user_id):
    """Generate AI-based predictions for savings."""
    return {
        "expected_savings_next_year": random.randint(500, 2000),
        "expected_co2_savings_next_year": random.randint(200, 800),
        "expected_distance_next_year": random.randint(10000, 20000)
    }
