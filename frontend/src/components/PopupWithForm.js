import React from "react";

function PopupWithForm(props) {
  const {
    name,
    title,
    children,
    isOpen,
    onClose,
    formName,
    submitButtonLabel,
    onSubmit,
    sumbitBtnLoading,
    isLoading,
    onOverlayClick,
    isFormValid,
    additionalTitleClass,
    additionalButtonClass,
  } = props;

  const titleClass = `popup__title ${
    name === "update-avatar" ? "popup__title_avatar" : ""
  } ${additionalTitleClass}`;

  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}
      onMouseDown={onOverlayClick}
    >
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
          name={formName}
          id={formName}
          className="popup__form"
          noValidate
        >
          <h2 className={titleClass}>{title}</h2>
          <fieldset className="popup__fieldset">{children}</fieldset>
          <button
            aria-label={submitButtonLabel}
            type="submit"
            className={`popup__btn-save${
              !isFormValid ? " popup__btn-save_disabled" : ""
            } ${additionalButtonClass}`}
            disabled={!isFormValid}
          >
            {isLoading ? sumbitBtnLoading : submitButtonLabel}
          </button>
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
