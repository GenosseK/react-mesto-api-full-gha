import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  buttonText,
  loginLink,
  handleSubmitForm,
  emailInput,
  passwordInput,
  handleChangeInput,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitForm();
  }

  return (
    <section className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleChangeInput}
          value={emailInput}
          autoComplete="off"
          required
        />
        <input
          className="login__input"
          placeholder="Пароль"
          type="password"
          name="password"
          onChange={handleChangeInput}
          value={passwordInput}
          minLength={4}
          autoComplete="off"
          required
        />
        <div className="login__submission-section">
          <button className="login__button">
            {buttonText}
          </button>
          {loginLink && (
            <p className="login__subtitle">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="login__link">
                Войти
              </Link>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
