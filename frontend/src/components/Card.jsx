import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__heart-button ${
    isLiked && "card__heart-button-active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  return (
    <article className="card">
      <button type="button" className="card__open-image" onClick={handleClick}>
        <img className="card__image" alt={card.name} src={card.link} />
      </button>
      {isOwn && (
        <button
          type="button"
          className="card__delete"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__subcard">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__heart-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__heart-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
