from flask import Blueprint, jsonify
from sqlalchemy import func
from EVConnect.models import db, EVUsage, CO2Savings, FinancialSavings, EnvironmentalImpact, Gamification, CommunityRankings
from EVConnect.insights.utils import calculate_future_predictions

insights_bp = Blueprint('insights', __name__)

@insights_bp.route('/insights/ev_usage/<int:user_id>', methods=['GET'])
def get_ev_usage(user_id):
    """Fetch daily EV usage stats."""
    usage = db.session.query(
        func.sum(EVUsage.distance_traveled_km).label('total_distance'),
        func.sum(EVUsage.energy_consumed_kwh).label('total_energy'),
        func.sum(EVUsage.charging_cost).label('total_cost')
    ).filter(EVUsage.user_id == user_id).first()

    print(f"EV Usage - User {user_id}: {usage}")  # Debugging log

    return jsonify({
        "total_distance_km": usage.total_distance or 0,
        "total_energy_kwh": usage.total_energy or 0,
        "total_charging_cost": usage.total_cost or 0
    })

@insights_bp.route('/insights/co2_savings/<int:user_id>', methods=['GET'])
def get_co2_savings(user_id):
    """Compute CO₂ emission reduction."""
    co2_data = db.session.query(
        func.sum(CO2Savings.fuel_vehicle_co2).label('fossil_co2'),
        func.sum(CO2Savings.ev_co2).label('ev_co2'),
        func.sum(CO2Savings.co2_saved).label('total_co2_saved')
    ).filter(CO2Savings.user_id == user_id).first()

    print(f"CO2 Savings - User {user_id}: {co2_data}")  # Debugging log

    return jsonify({
        "fossil_vehicle_co2": co2_data.fossil_co2 or 0,
        "ev_co2": co2_data.ev_co2 or 0,
        "total_co2_saved": co2_data.total_co2_saved or 0
    })

@insights_bp.route('/insights/financial_savings/<int:user_id>', methods=['GET'])
def get_financial_savings(user_id):
    """Calculate financial savings."""
    savings = db.session.query(
        func.sum(FinancialSavings.fuel_cost).label('fuel_cost'),
        func.sum(FinancialSavings.ev_cost).label('ev_cost'),
        func.sum(FinancialSavings.maintenance_savings).label('maintenance'),
        func.sum(FinancialSavings.tax_benefits).label('tax_benefits'),
        func.sum(FinancialSavings.total_savings).label('total_savings')
    ).filter(FinancialSavings.user_id == user_id).first()

    print(f"Financial Savings - User {user_id}: {savings}")  # Debugging log

    return jsonify({
        "fuel_cost": savings.fuel_cost or 0,
        "ev_cost": savings.ev_cost or 0,
        "maintenance_savings": savings.maintenance or 0,
        "tax_benefits": savings.tax_benefits or 0,
        "total_savings": savings.total_savings or 0
    })

@insights_bp.route('/insights/environmental_impact/<int:user_id>', methods=['GET'])
def get_environmental_impact(user_id):
    """Show environmental impact metrics."""
    impact = db.session.query(
        func.sum(EnvironmentalImpact.trees_saved).label('trees_saved'),
        func.sum(EnvironmentalImpact.air_quality_index_improvement).label('air_quality')
    ).filter(EnvironmentalImpact.user_id == user_id).first()

    print(f"Environmental Impact - User {user_id}: {impact}")  # Debugging log

    return jsonify({
        "trees_saved": impact.trees_saved or 0,
        "air_quality_improvement": impact.air_quality or 0
    })

@insights_bp.route('/insights/gamification/<int:user_id>', methods=['GET'])
def get_gamification(user_id):
    """Fetch user gamification details (badges, streaks)."""
    gamification = Gamification.query.filter_by(user_id=user_id).first()

    print(f"Gamification - User {user_id}: {gamification}")  # Debugging log

    return jsonify({
        "badges_awarded": gamification.badges_awarded.split(",") if gamification and gamification.badges_awarded else [],
        "current_streak": gamification.current_streak or 0,
        "longest_streak": gamification.longest_streak or 0
    })

@insights_bp.route('/insights/community_rankings/<int:user_id>', methods=['GET'])
def get_community_rankings(user_id):
    """Show leaderboard ranking for CO₂ savings and distance traveled."""
    rankings = CommunityRankings.query.filter_by(user_id=user_id).first()

    print(f"Community Rankings - User {user_id}: {rankings}")  # Debugging log

    return jsonify({
        "rank_by_distance": rankings.rank_by_distance if rankings else None,
        "rank_by_co2_savings": rankings.rank_by_co2_savings if rankings else None,
        "rank_by_savings": rankings.rank_by_savings if rankings else None
    })

@insights_bp.route('/insights/future_predictions/<int:user_id>', methods=['GET'])
def get_future_predictions(user_id):
    """AI-based predictions on savings (mock values for now)."""
    prediction = calculate_future_predictions(user_id)

    print(f"Future Predictions - User {user_id}: {prediction}")  # Debugging log

    return jsonify(prediction)

@insights_bp.route('/users', methods=['GET'])
def get_users():
    """Fetch all user IDs from the database."""
    users = db.session.query(EVUsage.user_id).distinct().all()
    user_ids = [user[0] for user in users]
    
    print(f"Fetched Users: {user_ids}")  # Debugging log
    
    return jsonify(user_ids)
