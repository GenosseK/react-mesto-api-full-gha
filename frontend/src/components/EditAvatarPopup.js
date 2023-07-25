import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import { validateUrl } from "../utils/FormValidator";

function EditAvatar(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClick } = props;

  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    reset();
    setValue("userAvatar", "", { shouldValidate: true });
  }, [isOpen, reset, setValue, currentUser]);

  const handleAvatarChange = (e) => {
    setValue("userAvatar", e.target.value, { shouldValidate: true });
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: e.target.userAvatar.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonLabel="Сохранить"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      formName="changeAvatar"
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
    >
      <fieldset className="popup__fieldset">
        <input
          type="url"
          className="popup__input"
          id="link-avatar-input"
          name="userAvatar"
          required
          placeholder="Ссылка на картинку"
          autoComplete="off"
          {...register("userAvatar", {
            validate: validateUrl,
          })}
          onChange={handleAvatarChange}
        />
        {errors.userAvatar && (
          <span className="popup__input-error popup__input-error_visible link-avatar-input-error">
            {errors.userAvatar.message}
          </span>
        )}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatar;
