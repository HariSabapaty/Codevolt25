import React from 'react'; 
import './App.css';
import CustomNavbar from './Components/Navbar';
import Banner from './Components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skills from './Components/Skills';
import Login from './Components/Login';
import Log from './Components/Log';
import CommunitySelect from './Components/CommunitySelect';
import CommunityPage  from './Components/CommunityPage';
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
        <Route path="/communityselect" element={<CommunitySelect/>}/>
        <Route path="/communitypage" element={<CommunityPage/>}/>
        <Route path="/login" element={<Log />} />
      </Routes>
    </Router>
  );
}
export default App;