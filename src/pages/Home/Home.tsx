import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

import './Home.scss';

import GameCardsList from '../../components/GameCardsList/GameCardsList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Error } from '../../components/Error/Error';

import { getPaginatedGames } from '../../services/games';

import { IGame } from '../../models/game';
import NotFound from '../NotFound/NotFound';

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameSearch, setGameSearch] = useState<string>(
    searchParams.get('search') || ''
  );

  const [games, setGames] = useState<IGame[]>([]);
  const [gamesCount, setGamesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPaginatedGames(currentPage, 8, searchParams.get('search') || '')
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

  const handlePageChange = (page: number) => {
    setLoading(true);
    setSearchParams({ search: gameSearch, page: page.toString() });

    getPaginatedGames(page, 8, searchParams.get('search') || '')
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error: Could not get the games data. ' + error?.message);
      });
    setCurrentPage(page);
  };

  const handleSearch = (searchQuery: string) => {
    setLoading(true);
    setGameSearch(searchQuery);
    getPaginatedGames(1, 8, searchQuery)
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error: Could not get the games data. ' + error.toString());
      });
    setCurrentPage(1);
  };

  return !loading && currentPage > Math.ceil(gamesCount / 8) ? (
    <NotFound />
  ) : (
    <main>
      <SearchBar onSubmitSearch={handleSearch} />
      {loading ? (
        <HashLoader color="#fb8500" />
      ) : error ? (
        <Error message={error} />
      ) : (
        <GameCardsList games={games} />
      )}
      <Pagination
        totalItems={gamesCount}
        pageSize={8}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        siblingCount={1}
      />
    </main>
  );
};

export default Home;
