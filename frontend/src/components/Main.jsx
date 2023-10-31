import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <div className="profile__card-user">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              alt="Аватар пользователя"
              className="profile__avatar"
              src={avatar}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="Галерея картинок">
        {cards.map(card => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
