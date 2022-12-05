import { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.scss';

import GameCardsList from './components/GameCardsList/GameCardsList';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import GameDetails from './pages/GameDetails/GameDetails';
import Pagination from './components/Pagination/Pagination';
import Login from './components/Login/Login';
import SearchBar from './components/SearchBar/SearchBar';

// import HashLoader from 'react-spinners/HashLoader';
import { getPaginatedGames } from './services/games';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

const App: FC = () => {
  console.log('App was rendered!!!');

  const { user, logOut } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
