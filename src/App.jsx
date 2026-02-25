import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import CallbackPage from './pages/CallbackPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
}

export default App;
