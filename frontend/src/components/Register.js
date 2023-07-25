import React from "react";
import AuthForm from "./AuthForm";

function Register({
  onRegister,
  passwordInput,
  emailInput,
  handleChangeInput,
}) {
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      loginLink={true}
      handleChangeInput={handleChangeInput}
      handleSubmitForm={onRegister}
      passwordInput={passwordInput}
      emailInput={emailInput}
    />
  );
}

export default Register;
