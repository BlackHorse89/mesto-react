import React from "react";

function Card({card, onCardOpen}) {

  function handleCardClick() {
    onCardOpen(card)
  }

  return (
    <li className="cards__element">
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <button className="cards__delete cards__delete_disable" type="button"></button>
      <div className="cards__item">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-box">
          <button className="cards__like" type="button"></button>
          <span className="cards__glory">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
export default Card;