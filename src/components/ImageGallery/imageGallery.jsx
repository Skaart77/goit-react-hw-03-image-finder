import PropTypes from 'prop-types';
import { ImageGalleryItem } from './imageGalleryItem';

function ImageGallery({ images, onClickImg }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURLL={largeImageURL}
          onClickImg={onClickImg}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
