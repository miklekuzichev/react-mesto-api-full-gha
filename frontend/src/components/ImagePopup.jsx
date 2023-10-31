function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_img ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__container-img">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__img" alt={card.name} src={card.link} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
