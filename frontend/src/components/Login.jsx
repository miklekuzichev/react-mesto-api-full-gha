import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email, password });
  };

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            value={email || ""}
            required
          />
          <input
            className="auth__input"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            onChange={handlePassword}
            value={password || ""}
            required
          />
        </fieldset>
        <button className="auth__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
