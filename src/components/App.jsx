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
    largeImgURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchImagesWithQuery(searchQuery, page);

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
    this.setState({
      searchQuery,
      images: [],
    });
  };

  toogleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onCurrentImageClick = largeImgURL => {
    this.setState(({ showModal }) => ({
      largeImgURL,
      showModal: !showModal,
    }));
  };
  render() {
    const { isLoading, showModal, images, largeImgURL } = this.state;

    if (isLoading === 'false') {
      return <Loader />;
    }

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {showModal && (
          <Modal onClose={this.toogleModal} webformatURL={largeImgURL} />
        )}
        <ImageGallery items={images} onClickImg={this.onCurrentImageClick} />
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
