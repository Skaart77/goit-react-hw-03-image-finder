import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  //   handleInputChange = e => {
  //     const { name, value } = e.currentTarget;
  //     this.setState({ [name]: value });
  //   };
  // Викликається під час відправлення форми
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  //Очистка форми
  reset = () => {
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
