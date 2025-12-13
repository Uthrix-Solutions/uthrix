import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Careers } from './pages/Careers';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}