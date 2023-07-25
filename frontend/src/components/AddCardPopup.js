import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import { validateTitle, validateUrl } from "../utils/FormValidator";

function AddCard({ onClose, isOpen, onAddCard, isLoading, onOverlayClick }) {
  const {
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm();

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
    reset();
  }, [isOpen]);

  // checking the validity of the inputs as the user types
  function handleCardNameChange(value) {
    setCardName(value);
    setValue("title", value, { shouldValidate: true });
  }

  // checking the validity of the inputs as the user types
  function handleCardLinkChange(value) {
    setCardLink(value);
    setValue("url", value, { shouldValidate: true });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="popup_add-card"
      formName="addCard"
      title="Новое Место"
      submitButtonLabel="Создать"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
    >
      <input
        type="text"
        className="popup__input"
        id="title-input"
        name="title"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        {...register("title", {
          validate: validateTitle,
        })}
        value={cardName}
        onChange={(e) => handleCardNameChange(e.target.value)}
      />
      {errors.title && (
        <span className="popup__input-error popup__input-error_visible name-error">
          {errors.title.message}
        </span>
      )}
      <input
        type="url"
        className="popup__input"
        id="link-input"
        name="url"
        required
        placeholder="Ссылка на картинку"
        autoComplete="off"
        {...register("url", {
          validate: validateUrl,
        })}
        value={cardLink}
        onChange={(e) => handleCardLinkChange(e.target.value)}
      />
      {errors.url && (
        <span className="popup__input-error popup__input-error_visible description-error">
          {errors.url.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddCard;
