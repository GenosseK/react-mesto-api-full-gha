import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import { validateName, validateDescription } from "../utils/FormValidator";

function EditProfile({
  onClose,
  isOpen,
  onUpdateUser,
  isLoading,
  onOverlayClick,
}) {
  const {
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    // Trigger validation when the popup is opened,
    // so the submit button is activated if the inputs are valid initially
    setValue("userName", currentUser.name, { shouldValidate: true });
    setValue("userDescription", currentUser.about, { shouldValidate: true });
  }, [currentUser, isOpen, setValue]);

  // checking the validity of the inputs as the user types
  function handleCardNameChange(value) {
    setName(value);
    setValue("userName", value, { shouldValidate: true });
  }

  // checking the validity of the inputs as the user types
  function handleCardLinkChange(value) {
    setDescription(value);
    setValue("userDescription", value, { shouldValidate: true });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <PopupWithForm
      name="profile-edit"
      formName="profileEdit"
      title="Редактировать профиль"
      submitButtonLabel="Сохранить"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      onClose={handleClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
    >
      <input
        type="text"
        className="popup__input"
        id="name"
        name="userName"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        {...register("userName", {
          validate: validateName,
        })}
        value={name ?? ""}
        onChange={(e) => handleCardNameChange(e.target.value)}
      />
      {errors.userName && (
        <span className="popup__input-error popup__input-error_visible title-input-error">
          {errors.userName.message}
        </span>
      )}
      <input
        type="text"
        className="popup__input"
        id="description"
        name="userDescription"
        required
        placeholder="Описание"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        {...register("userDescription", {
          validate: validateDescription,
        })}
        value={description ?? ""}
        onChange={(e) => handleCardLinkChange(e.target.value)}
      />
      {errors.userDescription && (
        <span className="popup__input-error popup__input-error_visible title-input-error">
          {errors.userDescription.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfile;
