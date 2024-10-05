import PropTypes from "prop-types";

import fallbackImage from "../../assets/fallback.jpg";
import css from "./ImageCard.module.css";

export default function ImageCard({
  imgAlt,
  imgSmallUrl,
  imgRegularUrl,
  onOpenModal,
}) {
  return (
    <div className={css.card}>
      <img
        onClick={() => onOpenModal({ imgAlt, imgRegularUrl })}
        className={css.image}
        src={imgSmallUrl ?? fallbackImage}
        alt={imgAlt}
      />
    </div>
  );
}

ImageCard.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgSmallUrl: PropTypes.string.isRequired,
  imgRegularUrl: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
