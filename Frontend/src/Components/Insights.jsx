import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const InsightsDashboard = () => {
  const [userId, setUserId] = useState(1);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/users");
        setAvailableUsers(response.data);
        if (response.data.length > 0) {
          setUserId(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = [
        `/insights/ev_usage/${userId}`,
        `/insights/co2_savings/${userId}`,
        `/insights/financial_savings/${userId}`
      ];
      const responses = await Promise.all(
        endpoints.map((url) => axios.get(`http://127.0.0.1:5000${url}`))
      );
      setInsights({
        evUsage: responses[0].data,
        co2Savings: responses[1].data,
        financialSavings: responses[2].data,
      });
    } catch (error) {
      console.error("Error fetching insights:", error);
      setError("Failed to fetch insights. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchInsights();
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">EV Insights Dashboard</h1>

      {/* User Selection Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border p-2 rounded bg-gray-800 text-white"
        >
          {availableUsers.map((user) => (
            <option key={user} value={user}>{`User ${user}`}</option>
          ))}
        </select>
        <button
          onClick={fetchInsights}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-white">Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Dashboard Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* EV Usage Card */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">EV Usage</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[insights.evUsage]}>
                <XAxis dataKey="total_distance_km" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_distance_km" fill="#82ca9d" name="Distance (km)" />
                <Bar dataKey="total_energy_kwh" fill="#8884d8" name="Energy (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CO2 Savings Card */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">CO₂ Savings</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Fossil CO₂", value: insights.co2Savings?.fossil_vehicle_co2 || 0 },
                    { name: "EV CO₂", value: insights.co2Savings?.ev_co2 || 0 }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {["#ff4444", "#00c851"].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Savings Card */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Financial Savings</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[insights.financialSavings]}>
                <XAxis dataKey="fuel_cost" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fuel_cost" fill="#ff7300" name="Fuel Cost" />
                <Bar dataKey="ev_cost" fill="#8884d8" name="EV Cost" />
                <Bar dataKey="total_savings" fill="#82ca9d" name="Total Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsDashboard;