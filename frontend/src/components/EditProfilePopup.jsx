import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext); // Подписка на контекст
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isRenderLoading={props.isRenderLoading}
      renderButtonText="Загрузка..."
    >
      <input
        type="text"
        name="username"
        id="name"
        value={name || ""}
        onChange={handleChangeName}
        placeholder="Иван Иванов"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        required
      />
      <span className="popup__error name-error"></span>
      <input
        type="text"
        name="userprofile"
        id="profile"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="Фотограф"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_profile"
        required
      />
      <span className="popup__error profile-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
