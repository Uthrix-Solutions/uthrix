import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Myfooter from './components/Myfooter';
import ContactPage from './components/ContactPage';
import LandingPage from './components/LandingPage';
import CareersPage from './components/CareersPage';
import Navbar from './components/Navbar';




function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Route>
        </Routes>
        <Myfooter />
      </BrowserRouter>
    </>
  );
}

export default App;
