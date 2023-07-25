import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddCard,
    onImageClick,
    onDeleteCardClick,
    onCardDelete,
    onCardLike,
    cards,
    onConfirmCardDelete,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="profile__avatar-edit-button"
          ></button>
          <div className="profile__description">
            <div className="profile__user">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                aria-label="Редактировать"
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddCard}
          aria-label="Добавить карточку"
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onImageClick}
              onDeleteCardClick={onDeleteCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onConfirmCardDelete={onConfirmCardDelete}
            />
          ))}
        </ul>
      </section>
      {/* Кнопка скролла вверх */}
      <button id="scroll-to-top-button"></button>
    </main>
  );
}

export default Main;
