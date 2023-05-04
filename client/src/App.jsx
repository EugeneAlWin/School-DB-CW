import Navbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage.jsx';

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
}
