import React from 'react'; 
import './App.css';
import CustomNavbar from './Components/Navbar';
import Banner from './Components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skills from './Components/Skills';
import Login from './Components/Login';
import Log from './Components/Log';
import InsightsDashboard from './Components/Insights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Model from './Components/Model';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <CustomNavbar />
              <Banner />
              <Skills />
              <Login />
              
            </>
          } 
        />
        <Route path="/login" element={<Log />} />
        <Route path="/insights" element={<InsightsDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;