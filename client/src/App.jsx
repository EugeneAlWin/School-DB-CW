import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import { Route, Router } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Router>
          <Route path='' />
        </Router>
      </div>
      <HomePage />
    </div>
  );
}
