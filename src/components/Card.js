function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
      <div className="element">
        <li className="element__item">
          <img
            className="element__image"
            src={props.card.link}
            alt={props.card.name}
            onClick={handleClick}
          />
          <button
            className="element__trash"
            aria-label="Удалить"
            type="button"
          ></button>
          <div className="element__group">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-button">
              <button
                className="element__like"
                aria-label="Оценка"
                type="button"
              ></button>
              <span className="element__like-count">{props.card.likes.length}</span>
            </div>
          </div>
        </li>
      </div>
  );
}

export default Card;