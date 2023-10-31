import { Link } from "react-router-dom";
import React, { useState } from "react";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ email, password });
  };

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <fieldset className="auth__fieldset">
            <input
              className="auth__input"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={email}
              required
            />
            <input
              className="auth__input"
              name="password"
              id="password"
              type="password"
              minLength="8"
              placeholder="Пароль"
              onChange={handlePassword}
              value={password}
              required
            />
          </fieldset>
          <button className="auth__submit" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="auth__hint">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
