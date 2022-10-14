import React, { useEffect, useState } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import ImagePopup from './components/ImagePopup.js';
import api from './utils/Api.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    api.getInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(`Возникла ошибка ${err}`))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(response => {
        setCards(response)
      })
      .catch(err => console.log(`Возникла ошибка ${err}`))
  }, [])

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        currentUser = {currentUser}
        cards = {cards}
        onClickCard = {handleCardClick}
      />

      <PopupWithForm name="type_edit-profile" form="form_profile" title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input type="text" name="name" placeholder="Имя" className="popup__text popup__text_name" id="popup-name" required minLength="2" maxLength="40" />
            <span className="popup__error-visible popup-name-error"></span>
            <input type="text" name="about" placeholder="Работа" className="popup__text popup__text_job" id="popup-job" required minLength="2" maxLength="200" />
            <span className="popup__error-visible popup-job-error"></span>
      </PopupWithForm>

      <PopupWithForm name="place" form="form_cards" title="Новое место"
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input type="text" name="name" placeholder="Название" className="popup__text popup__text_place" id="popup-place" required minLength="2" maxLength="30" />
            <span className="popup__error-visible popup-place-error"></span>
            <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__text popup__text_image" id="popup-image" required />
            <span className="popup__error-visible popup-image-error"></span>
      </PopupWithForm>

      <PopupWithForm name="avatar" form="form_avatar" title="Обновить аватар" container="avatar"
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input className="popup__text popup__text_avatar" type="url" name="avatar" id="popup-avatar" placeholder="ссылка на аватар" required minLength="10" />
            <span className="popup__error-visible popup-avatar-error"></span>
      </PopupWithForm>

      <div className="popup popup_confirm">
        <div className="popup__container popup__container-confirm">
          <button className="popup__close" type="button"></button>
          <form className="popup__form popup__form_confirm">
            <h3 className="popup__title popup__title-confirm">Вы уверены?</h3>
            <button className="popup__save" type="submit">Да</button>
          </form>
        </div>
      </div>

      <ImagePopup 
        card = {selectedCard} 
        isOpen = {isImagePopupOpen}
        onClose = {closeAllPopups}
        />

      <Footer />
    </div>
  );
}

export default App;
