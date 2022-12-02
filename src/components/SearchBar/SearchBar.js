import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.scss';

const SearchBar = ({ onSubmitSearch }) => {
  const [searchVal, setSearchVal] = useState('');

  function handleSubmitSearch(e) {
    e.preventDefault();
    onSubmitSearch(searchVal);
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
            setSearchVal(e.target.value);
          }}
          value={searchVal}
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
