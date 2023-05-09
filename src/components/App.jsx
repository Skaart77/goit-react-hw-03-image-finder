import React, { Component } from 'react';
import api from 'api/api';
import Searchbar from './Searchbar/searchbar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const images = api.fetchImagesWithQuery('react');
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return <Searchbar />;
  }
}

export default App;
