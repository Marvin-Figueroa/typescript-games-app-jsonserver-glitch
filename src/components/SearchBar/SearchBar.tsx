import React, { FC, FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

import './SearchBar.scss';

interface Props {
  onSubmitSearch: (searchQuery: string) => void;
}

const SearchBar: FC<Props> = ({ onSubmitSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [gameSearch, setGameSearch] = useState<string>(
    searchParams.get('search') || ''
  );

  function handleSubmitSearch(e: FormEvent) {
    e.preventDefault();
    onSubmitSearch(gameSearch);
    setSearchParams({ search: gameSearch, page: '1' });
  }

  return (
    <form
      onSubmit={handleSubmitSearch}
      className="form-search"
      id="form-search"
    >
      <label className="form-search__label" htmlFor="search-games">
        Search Games
      </label>
      <div className="form-search__inputs">
        <input
          className="form-search__input"
          type="search"
          name="search-games"
          id="search-games"
          placeholder="enter a game title"
          onChange={(e) => {
            setGameSearch(e.target.value);
          }}
          value={gameSearch}
          maxLength={50}
        />
        <button className="form-search__btn">
          <FaSearch className="form-search__icon" />
        </button>
      </div>
    </form>
  );
};

export default React.memo(SearchBar);
