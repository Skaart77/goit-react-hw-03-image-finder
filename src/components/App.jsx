import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesWithQuery } from 'api/api';
import Searchbar from './Searchbar/searchbar';
import ImageGallery from './ImageGallery/imageGallery';
import Modal from './Modal/modal';
import Button from './Button/button';
import Loader from './Loader/loader';

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
      const images = await fetchImagesWithQuery('react');
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
    const { isLoading, showModal, images } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toogleModal} />}
        {images.length > 0 ? <ImageGallery images={images} /> : null}
        {images.length >= 12 && <Button onLoadMoreBtnClick={this.onLoadMore} />}
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
      </div>
    );
  }
}

export default App;
