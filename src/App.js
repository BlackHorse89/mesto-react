import React, { useEffect, useState } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import ImagePopup from './components/ImagePopup.js';
import api from './utils/Api.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';
import EditProfilePopup from './components/EditProfilePopup.js';
import EditAvatarPopup from './components/EditAvatarPopup.js';
import AddPlacePopup from './components/AddPlacePopup.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentCardDelete, setCurrentCardDelete] = useState({});

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteNewCard(card._id).then(() => {
      setCards(cards.filter((prevCard) => prevCard._id !== card._id));
      setCurrentCardDelete(card);
    })
  }

  function handleSubmit(data) {
    api.patchInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные о ползователе не отправляються. ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные новой карточки не отправляютьсяю. ${err}`))
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          currentUser = {currentUser}
          cards = {cards}
          onClickCard = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete={handleCardDelete} />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleSubmit} />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} />

        <div className="popup popup_confirm">
          <div className="popup__container popup__container-confirm">
            <button className="popup__close" type="button"></button>
            <form className="popup__form popup__form_confirm">
              <h3 className="popup__title popup__title-confirm">Вы уверены?</h3>
              <button className="popup__save" type="submit">Да</button>
            </form>
          </div>
        </div>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
    );
}
export default App;