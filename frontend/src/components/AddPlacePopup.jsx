import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [imageName, setImageName] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      imageName,
      imageLink,
    });
  }

  function handlleImageNameChange(evt) {
    setImageName(evt.target.value);
  }

  function handleImageLinkChange(evt) {
    setImageLink(evt.target.value);
  }

  React.useEffect(() => {
    setImageName("");
    setImageLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
      renderButtonText="Загрузка..."
      isRenderLoading={props.isRenderLoading}
    >
      <input
        type="text"
        name="imagename"
        onChange={handlleImageNameChange}
        value={imageName}
        id="imageName"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_imagename"
        required
      />
      <span className="popup__error imageName-error"></span>
      <input
        type="url"
        name="imagelink"
        onChange={handleImageLinkChange}
        value={imageLink}
        id="imageLink"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_imageurl"
        required
      />
      <span className="popup__error imageLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
