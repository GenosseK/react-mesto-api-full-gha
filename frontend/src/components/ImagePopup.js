import React from "react";

function ImagePopup(props) {
  const { isOpen, onClose, imageSrc, altText, onOverlayClick } = props;

  return (
    <div
      className={`popup popup_image-viewer ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClick}
    >
      <figure className="popup__image-container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__btn-close popup__btn-close_image-viewer"
          onClick={onClose}
        ></button>
        <img src={imageSrc} alt={altText} className="popup__image" />
        <figcaption className="popup__figcaption">{altText}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
