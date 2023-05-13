import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'api/api';
import Searchbar from './Searchbar/searchbar';
import { ImageGallery } from './ImageGallery/imageGallery';
import Modal from './Modal/modal';
import Button from './Button/button';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    pageNumber: 1,
    searchQuery: '',
    showModal: false,
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
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toogleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  onLoadMore = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {showModal && <Modal onClose={this.toogleModal} />}
        <ImageGallery images={this.state.images} />
        {images && <Button onLoadMoreBtnClick={this.onLoadMore} />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }
}

export default App;
