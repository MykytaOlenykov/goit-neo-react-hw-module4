import ReactModal from "react-modal";
import PropTypes from "prop-types";
import css from "./ImageModal.module.css";

export default function ImageModal({ imgAlt, imgUrl, isOpen, onClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.content}
      appElement={document.body}
    >
      <img className={css.image} src={imgUrl} alt={imgAlt} />
    </ReactModal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imgAlt: PropTypes.string,
  imgUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
