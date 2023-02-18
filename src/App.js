import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CameraPage from './pages/CameraPage';
import MainPage from './pages/MainPage';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/CameraPage" element={<CameraPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
