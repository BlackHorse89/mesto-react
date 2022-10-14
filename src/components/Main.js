import React, {useState, useEffect} from 'react';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription ] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  useEffect(() => {
    setUserName(props.currentUser.name)
    setUserDescription(props.currentUser.about)
    setUserAvatar(props.currentUser.avatar)
  }, [props.currentUser]) 

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
        </div>
        <div className="profile__text">
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery" aria-label="галерея каточек">
        <ul className="cards">
          {props.cards.map((card) => (
            <Card 
              card={card} 
              onCardOpen={props.onClickCard} 
              key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  )
}
export default Main;