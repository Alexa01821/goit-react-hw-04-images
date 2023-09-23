import React from 'react';
import { SearchBarHeader } from './SearchBarStyled';
import { Notify } from 'notiflix';
import { Component } from 'react';

export class SearchBar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return Notify.failure('Fill in the search param!');
    }
    this.props.searchImages(this.state.value.toLowerCase().trim());
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchBarHeader onSubmit={this.handleSubmit}>
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
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </SearchBarHeader>
    );
  }
}
