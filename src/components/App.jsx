import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
    page: 1,
    showModal: false,
    searchQuery: '',
    largeImageURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true, images: [] });
      try {
        const response = await fetchImagesWithQuery(
          this.state.searchQuery,
          this.state.page
        );

        if (response.length === 0) {
          this.setState({ isLoading: false });
          return toast.error('Enter your search query!');
        }
        if (response.length > 0) {
          this.setState(({ images }) => ({
            images: [...images, ...response],
            isLoading: true,
          }));
        }
      } catch (error) {
        this.setState({ isLoading: false, error });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  toogleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  clickCurrentImg = url => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  render() {
    const { isLoading, showModal, images } = this.state;

    if (isLoading === 'false') {
      return <Loader />;
    }

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {isLoading && <Loader />} */}
        {showModal && (
          <Modal
            onClose={this.toogleModal}
            largeImageURL={this.clickCurrentImg}
          />
        )}
        <ImageGallery items={images} onClickImg={this.clickCurrentImg} />
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
