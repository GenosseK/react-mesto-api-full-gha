import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
  onOverlayClick,
}) {
  function handleDeleteClick(e) {
    e.preventDefault();
    onCardDelete(isOpen);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      formName="delete-card-form"
      onSubmit={handleDeleteClick}
      isLoading={isLoading}
      submitButtonLabel="Да"
      sumbitBtnLoading="Удаление..."
      onOverlayClick={onOverlayClick}
      isFormValid={true}
      additionalTitleClass="popup__title_confirm"
      additionalButtonClass="popup__btn-confirm"
    />
  );
}

export default ConfirmationPopup;
