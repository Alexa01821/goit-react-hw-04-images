import { useState } from 'react';
import { SearchBarHeader } from './SearchBarStyled';
import { Notify } from 'notiflix';

export const SearchBar = ({ searchImages }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return Notify.failure('Fill in the search param!');
    }
    searchImages(value.toLowerCase().trim());
    setValue('');
  };

  return (
    <SearchBarHeader onSubmit={handleSubmit}>
      <form className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </SearchBarHeader>
  );
};