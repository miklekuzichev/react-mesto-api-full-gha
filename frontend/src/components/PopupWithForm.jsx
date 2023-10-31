function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          className="popup__form"
        >
          <div className="popup__fieldset">
            {props.children}
            <button type="submit" className="popup__button">
              {props.isRenderLoading
                ? props.renderButtonText
                : props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
