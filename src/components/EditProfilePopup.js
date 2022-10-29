import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChange(e) {
    setName(e.target.name);
    setDescription(e.target.description);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm name="type_edit-profile" form="form_profile" title="Редактировать профиль"
      isOpen={isOpen} onClose={onClose}>
          <input type="text" name="name" placeholder="Имя" className="popup__text popup__text_name" id="popup-name" 
            required minLength="2" maxLength="40" value={name} onChange={handleChange} />
          <span className="popup__error-visible popup-name-error"></span>
          <input type="text" name="about" placeholder="Работа" className="popup__text popup__text_job" id="popup-job" 
            required minLength="2" maxLength="200" value={description} onChange={handleChange} />
          <span className="popup__error-visible popup-job-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;