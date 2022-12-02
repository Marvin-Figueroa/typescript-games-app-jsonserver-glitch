import React, { useEffect, useState } from 'react';

import './App.scss';

import GameCardsGrid from './components/GameCardsGrid/GameCardsGrid';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import GameDetails from './components/GameDetails/GameDetails';
import Pagination from './components/Pagination/Pagination';
import Login from './components/Login/Login';
import SearchBar from './components/SearchBar/SearchBar';

import HashLoader from 'react-spinners/HashLoader';
import { getPaginatedGames } from './services/games';
import { useAuth } from './hooks/useAuth';

function App() {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [gameSearch, setGameSearch] = useState('');
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  console.log('App was rendered!!!');

  const { logOut } = useAuth();

  useEffect(() => {
    setLoading(true);
    getPaginatedGames()
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Error: Could not get the games data');
      });
  }, []);

  const handleClick = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleGameSelect = (id) => {
    const game = games.find((game) => Number(game.id) === Number(id));
    setSelectedGame(game);
    setCurrentPage('game');
  };

  const handlePageChange = (page) => {
    setLoading(true);
    getPaginatedGames(page, 8, gameSearch)
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error: Could not get the games data');
        console.log(error);
      });
    setCurrentGamesPage(page);
  };

  function handleLogin(user) {
    setLoggedInUser(user);
    setCurrentPage('games');
  }

  function handleLogout() {
    setLoggedInUser(null);
    logOut();
  }

  const handleSearch = (searchQuery) => {
    setLoading(true);
    getPaginatedGames(1, 8, searchQuery)
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error: Could not get the games data');
        console.log(error);
      });
    setGameSearch(searchQuery);
    setCurrentGamesPage(1);
  };

  return (
    <div className="App">
      <>
        <Navbar
          onLogOut={handleLogout}
          user={loggedInUser}
          onLinkClick={handleClick}
          currentPage={currentPage}
        />
        <main>
          {(currentPage === 'login' && <Login onLogin={handleLogin} />) ||
            (currentPage === 'games' && (
              <>
                <SearchBar onSubmitSearch={handleSearch} />
                {error ? <div className="error">{error}</div> : null}
                {loading ? (
                  <HashLoader color="#fb8500" />
                ) : (
                  <GameCardsGrid
                    handleGameSelect={handleGameSelect}
                    games={games}
                  />
                )}
                <Pagination
                  totalItems={gamesCount}
                  pageSize={8}
                  currentPage={currentGamesPage}
                  onPageChange={handlePageChange}
                />
              </>
            )) ||
            (currentPage === 'about' && <About />) ||
            (currentPage === 'game' && (
              <GameDetails user={loggedInUser} gameId={selectedGame.id} />
            ))}
        </main>
        <Footer />
      </>
    </div>
  );
}

export default App;
