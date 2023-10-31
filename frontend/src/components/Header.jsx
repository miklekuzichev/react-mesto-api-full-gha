import logo from "../images/logo.svg";
import { Link, Routes, Route, useLocation } from "react-router-dom";

function Header(props) {
  const { loggedIn, userEmail, onSignOut } = props;
  const location = useLocation(); //<div className="header__sign">Войти</div>
  const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = loggedIn ? "Выйти" : linkText;

  return (
    <header className="header">
      <img src={logo} alt="Лого шапки сайта" className="header__logo" />

      <nav className="header__navigate">
        {loggedIn && <label className="header__label">{userEmail}</label>}
        <Routes>
          <Route
            path="/react-mesto-auth"
            element={
              <Link to="/sign-in" className="header__sign-out">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__sign-out">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__sign-out">
                Регистрация
              </Link>
            }
          />
        </Routes>

        {loggedIn && (
          <button className="header__sign-out" onClick={onSignOut}>
            {buttonText}
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
