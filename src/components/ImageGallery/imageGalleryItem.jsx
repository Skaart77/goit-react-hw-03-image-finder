import PropTypes from 'prop-types';

function ImageGalleryItem({ id, webformatURL, largeImageURL, onClickImg }) {
  return (
    <li className="gallery-item" key={id}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="Тут зображення"
        onClick={() => onClickImg(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.PropTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
