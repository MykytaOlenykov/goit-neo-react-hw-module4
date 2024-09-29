import { useState } from "react";
import PropTypes from "prop-types";

import ImageModal from "../ImageModal";

import fallbackImage from "../../assets/fallback.jpg";
import css from "./ImageCard.module.css";

export default function ImageCard({ imgAlt, imgSmallUrl, imgRegularUrl }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={css.card} onClick={() => setOpen(true)}>
        <img
          className={css.image}
          src={imgSmallUrl ?? fallbackImage}
          alt={imgAlt}
        />
      </div>
      {open && (
        <ImageModal
          isOpen={open}
          imgAlt={imgAlt}
          imgUrl={imgRegularUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

ImageCard.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgSmallUrl: PropTypes.string.isRequired,
  imgRegularUrl: PropTypes.string.isRequired,
};
