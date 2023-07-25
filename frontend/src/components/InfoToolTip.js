import success from "../images/Success.svg";
import error from "../images/Error.svg";

export default function InfoToolTip({
  isOpen,
  onClose,
  isStatusOk,
  onOverlayClick,
}) {
  return (
    <div
      className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClick}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__btn-close"
          aria-label="Закрыть"
          type="button"
        />
        <img
          className="popup__response-image"
          src={isStatusOk ? success : error}
        />
        <h3 className="popup__response-title">
          {isStatusOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}
