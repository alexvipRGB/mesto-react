import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});

  const blurHandler = (e, paramsDirty, paramsError) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "inputTitle":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
      case "inputUrl":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
      case "inputAvatarUrl":
        paramsDirty(true);
        paramsError(e.target.validationMessage);
        break;
    }
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((e) => console.log(e));
  }, []);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
      })
      .catch((err) => console.log(err));
  }
  const handleDeleteCardSubmit = (card) => {
    api
      .removeCard(card._id)
      .then((res) => {
        const newCards = cards.filter((c) => (c._id === card._id ? "" : res));
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleCardDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setDeleteCard(card);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };
  function clearValidationError(
    setFirstInputDirty,
    setFirstInputError,
    setSecondInputDirty,
    setSecondInputError
  ) {
    setFirstInputDirty(false);
    setFirstInputError("can't be blank");
    setSecondInputDirty(false);
    setSecondInputError("can't be blank");
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDeleteClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          blurHandler={blurHandler}
          clearValidationError={clearValidationError}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          blurHandler={blurHandler}
          clearValidationError={clearValidationError}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          blurHandler={blurHandler}
          clearValidationError={clearValidationError}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCardSubmit}
          card={deleteCard}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;