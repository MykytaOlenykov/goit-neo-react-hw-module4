import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./ImageModal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function ImageModal({ imgAlt, imgUrl, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.content}>
        <img className={css.image} src={imgUrl} alt={imgAlt} />
      </div>
    </div>,
    modalRoot
  );
}

ImageModal.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
