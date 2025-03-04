import React from 'react'; 
import './App.css';
import CustomNavbar from './Components/Navbar';
import Banner from './Components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skills from './Components/Skills';
import Login from './Components/Login';
import Log from './Components/Log';
import InsightsDashboard from './Components/Insights';
import CommunitySelect from './Components/CommunitySelect';
import Footer from './Components/Footer'; // Import the Footer
import CommunityPage  from './Components/CommunityPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
              <Footer />  {/* Add Footer here */}
            </>
          } 
        />
        <Route path="/communityselect" element={<><CommunitySelect/><Footer /></>} />
        <Route path="/communitypage" element={<CommunityPage/>}/>
        <Route path="/login" element={<><Log /><Footer /></>} />
        <Route path="/insights" element={<><InsightsDashboard /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
