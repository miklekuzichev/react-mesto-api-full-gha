import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef(currentUser.avatar);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]); // Очищаем форму

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      imagelink: avatarRef.current.value, // Значение инпута, полученное с помощью рефа
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isRenderLoading={props.isRenderLoading}
      renderButtonText="Загрузка..."
    >
      <input
        type="url"
        name="imagelink"
        id="imageLinkProfile"
        ref={avatarRef}
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_imageurl"
        required
      />
      <span className="popup__error imageLinkProfile-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
