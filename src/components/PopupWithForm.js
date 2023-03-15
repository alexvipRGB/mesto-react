function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name}_popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__text">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children}
          <button
            className="popup__save"
            type="submit"
            name="submit"
            aria-label={props.label}
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;