import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };
  // Викликається під час відправлення форми
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Enter your search query!');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
