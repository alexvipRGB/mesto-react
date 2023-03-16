import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="popupProfile"
        title={"Редактировать профиль"}
        button={"Сохранить"}
        label={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <Input
          id={"nameInput"}
          class={"popup__name_profile"}
          type={"text"}
          name={"nameInput"}
          placeholder={"Ваше имя"}
          min={"2"}
          max={"40"}
        />
        <Input
          id={"jobInput"}
          class={"popup__name_job"}
          type={"text"}
          name={"jobInput"}
          placeholder={"Род деятельности"}
          min={"2"}
          max={"200"}
        />
      </PopupWithForm>
      <PopupWithForm
        name="popupNewMesto"
        title={"Новое место"}
        button={"Создать"}
        label={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <Input
          id={"nameNewMesto"}
          class={"popup__name_text"}
          type={"text"}
          name="nameNewMesto"
          placeholder={"Название"}
          min={"2"}
          max={"200"}
        />
        <Input
          id={"linkNewMesto"}
          class={"popup__name_img"}
          type={"url"}
          name="linkNewMesto"
          placeholder={"Ссылка на картинку"}
        />
      </PopupWithForm>
      <PopupWithForm
        name="inputAvatarUrl"
        title={"Обновить аватар"}
        button={"Сохранить"}
        label={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <Input
          id={"avatar-url"}
          class={"popup__name_avatar"}
          type={"url"}
          name="inputAvatarUrl"
          placeholder={"Ссылка на картинку"}
        />
      </PopupWithForm>
      <PopupWithForm
        name="popupFormClose"
        title={"Вы уверены?"}
        button={"Да"}
        label={"Подтвердить"}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />
    </div>
  );
}

export default App;