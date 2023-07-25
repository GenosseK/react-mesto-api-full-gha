import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onConfirmCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeButtonToggleClass = `element__button-like ${
    isLiked && "element__button-like_active"
  }`;

  function handleCardClick() {
    onCardClick(card.link, card.name);
  }

  const handleLikeClick = () => onCardLike(card);

  function handleConfirmClick() {
    onConfirmCardDelete(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          className="element__button-delete"
          onClick={handleConfirmClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__info">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__like-container">
          <button
            aria-label="Нравится"
            type="button"
            className={likeButtonToggleClass}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
