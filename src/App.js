import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CameraPage from './pages/CameraPage';
import MainPage from './pages/MainPage';
import { ImageOutlined } from '@mui/icons-material';
import Detail from './pages/Detail';
import Result from './pages/Result';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/CameraPage" element={<CameraPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
