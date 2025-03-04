import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const InsightsDashboard = () => {
  const [userId, setUserId] = useState(1); // Default user ID
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const endpoints = [
        `/insights/ev_usage/${userId}`,
        `/insights/co2_savings/${userId}`,
        `/insights/financial_savings/${userId}`,
        `/insights/environmental_impact/${userId}`,
        `/insights/gamification/${userId}`,
        `/insights/community_rankings/${userId}`,
        `/insights/future_predictions/${userId}`
      ];

      const responses = await Promise.all(
        endpoints.map((url) => axios.get(`http://127.0.0.1:5000${url}`))
      );

      setInsights({
        evUsage: responses[0].data,
        co2Savings: responses[1].data,
        financialSavings: responses[2].data,
        environmentalImpact: responses[3].data,
        gamification: responses[4].data,
        communityRankings: responses[5].data,
        futurePredictions: responses[6].data,
      });
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">EV Insights Dashboard</h1>

      <div className="flex justify-center mb-4">
        <label className="mr-2">User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchInsights}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Refresh
        </button>
      </div>

      {loading ? <p>Loading data...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EV Usage Insights */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">EV Usage</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[insights.evUsage]}>
                <XAxis dataKey="total_distance_km" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_distance_km" fill="#82ca9d" name="Distance (km)" />
                <Bar dataKey="total_energy_kwh" fill="#8884d8" name="Energy (kWh)" />
                <Bar dataKey="total_charging_cost" fill="#ff7300" name="Charging Cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CO2 Savings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">CO2 Savings</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[insights.co2Savings]}>
                <XAxis dataKey="total_co2_saved" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_co2_saved" stroke="#8884d8" name="CO2 Saved" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Savings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Financial Savings</h2>
            <p>Fuel Cost: ${insights.financialSavings?.fuel_cost}</p>
            <p>EV Cost: ${insights.financialSavings?.ev_cost}</p>
            <p>Maintenance Savings: ${insights.financialSavings?.maintenance_savings}</p>
            <p>Tax Benefits: ${insights.financialSavings?.tax_benefits}</p>
            <p>Total Savings: ${insights.financialSavings?.total_savings}</p>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Environmental Impact</h2>
            <p>Trees Saved: {insights.environmentalImpact?.trees_saved}</p>
            <p>Air Quality Improvement: {insights.environmentalImpact?.air_quality_improvement}</p>
          </div>

          {/* Gamification */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Gamification</h2>
            <p>Badges: {insights.gamification?.badges_awarded?.join(", ") || "None"}</p>
            <p>Current Streak: {insights.gamification?.current_streak}</p>
            <p>Longest Streak: {insights.gamification?.longest_streak}</p>
          </div>

          {/* Community Rankings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Community Rankings</h2>
            <p>Rank by Distance: {insights.communityRankings?.rank_by_distance || "N/A"}</p>
            <p>Rank by CO2 Savings: {insights.communityRankings?.rank_by_co2_savings || "N/A"}</p>
            <p>Rank by Savings: {insights.communityRankings?.rank_by_savings || "N/A"}</p>
          </div>

          {/* Future Predictions */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Future Predictions</h2>
            <p>Predicted Yearly Savings: ${insights.futurePredictions?.predicted_yearly_savings}</p>
            <p>Predicted CO2 Reduction: {insights.futurePredictions?.predicted_co2_reduction} kg</p>
            <p>Predicted Distance: {insights.futurePredictions?.predicted_distance} km</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsDashboard;
