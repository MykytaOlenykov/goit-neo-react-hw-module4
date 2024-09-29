import { forwardRef } from "react";
import PropTypes from "prop-types";

import ImageCard from "../ImageCard";

import css from "./ImageGallery.module.css";

const ImageGallery = forwardRef(({ images }, ref) => {
  return (
    <ul className={css.list} ref={ref}>
      {images.map(({ id, alt, smallUrl, regularUrl }) => (
        <li key={id}>
          <ImageCard
            imgAlt={alt}
            imgRegularUrl={regularUrl}
            imgSmallUrl={smallUrl}
          />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = "ImageGallery";

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      smallUrl: PropTypes.string.isRequired,
      regularUrl: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
