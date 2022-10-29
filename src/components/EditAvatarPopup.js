import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup({isOpen, onClose}) {
  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.createRef();

  function focusTextInput() {
    avatarRef.current.focus();
  }




  return (
    <PopupWithForm name="avatar" form="form_avatar" title="Обновить аватар" container="avatar"
      isOpen={isOpen} onClose={onClose} >
       <input className="popup__text popup__text_avatar" type="url"  name="avatar" 
        id="popup-avatar" placeholder="ссылка на аватар" required minLength="10" />
       <span className="popup__error-visible popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;