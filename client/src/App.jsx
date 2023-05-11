import Navbar from './components/Navbar.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import JournalPage from './pages/JournalPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <div>
        <Routes>
          <Route path='*' element={<SearchPage />}></Route>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/journal' element={<JournalPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}
