import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupAddCard from "./AddCardPopup";
import ImagePopup from "./ImagePopup";
import EditAvatar from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import ScrollButton from "./ScrollButton";
import api from "../utils/API";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import LoadingTokenScreen from "./LoadingTokenScreen";

function App() {
  // USE STATE
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isImageViewerPopupOpen, setImageViewerPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [registrated, setRegistrated] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  const navigate = useNavigate();

  // Handle Popups Opening
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddCardClick = () => setAddCardPopupOpen(true);
  function handleConfimationClick(card) {
    setConfirmationPopupOpen(card);
  }
  const openImageViewer = (src, name) => {
    setImageSrc(src);
    setAltText(name);
    setImageViewerPopupOpen(true);
  };

  // Handle Popups Closing
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setImageViewerPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setInfoToolTipOpen(false);
  }

  const modalWindowOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddCardPopupOpen ||
    isImageViewerPopupOpen ||
    isConfirmationPopupOpen ||
    isInfoToolTipOpen;

  // Closing popups by ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    if (modalWindowOpened) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalWindowOpened]);

  // Closing Popups by Overlay
  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  // Checking Token
  function checkToken() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setloggedIn(true);
          navigate("/");
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
        .finally(() => {
          setIsLoadingToken(false);
        });
    } else {
      navigate("/sign-in");
      setIsLoadingToken(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  // Getting Users Data
  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Card Deletion
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Card Like
  function handeleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Error: ${error}`));
  }

  // Editing User's Info
  function handleEditUserInfo(user) {
    setIsLoading(true);
    api
      .editUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Changing Avatar
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Add Card
  function handleAddCard(card) {
    setIsLoading(true);
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [authData, setAuthData] = useState({
    password: "",
    email: "",
  });

  // Registration
  function handleRegister() {
    setRegistrated(false);
    const { password, email } = authData;
    auth
      .register(password, email)
      .then((res) => {
        if (res.email) {
          setRegistrated(true);
          navigate("/sign-in");
        }
      })
      .then(() => {
        setAuthData({ password: "", email: "" });
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => setInfoToolTipOpen(true));
  }

  // Logging in
  const handleLogin = () => {
    const { password, email } = authData;
    auth
      .authorise(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setUserEmail(email);
          setloggedIn(true);
          navigate("/");
        }
      })
      .then(() => {
        setAuthData({ password: "", email: "" });
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  // Logging Out
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setloggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setAuthData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoadingToken ? (
          <LoadingTokenScreen />
        ) : (
          <Routes>
            <Route
              path="/sign-up"
              element={
                <>
                  <Header buttonText="Войти" link="/sign-in" />

                  <Register
                    onRegister={handleRegister}
                    passwordInput={authData.password}
                    emailInput={authData.email}
                    handleChangeInput={handleChangeInput}
                  />
                  <InfoToolTip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    isStatusOk={registrated}
                    onOverlayClick={closeByOverlay}
                  />
                </>
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Header buttonText="Регистрация" link="/sign-up" />

                  <Login
                    onLogin={handleLogin}
                    passwordInput={authData.password}
                    emailInput={authData.email}
                    handleChangeInput={handleChangeInput}
                  />
                  <InfoToolTip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    isStatusOk={registrated}
                    onOverlayClick={closeByOverlay}
                  />
                </>
              }
            />

            <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      loggedIn={loggedIn}
                      onLoggingOut={handleLogOut}
                      userEmail={userEmail}
                      buttonText="Выйти"
                      link="/sign-in"
                    />

                    <Main
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddCard={handleAddCardClick}
                      onImageClick={openImageViewer}
                      onConfirmCardDelete={handleConfimationClick}
                      onCardDelete={handleCardDelete}
                      onCardLike={handeleCardLike}
                      cards={cards}
                    />

                    <Footer />

                    <EditProfilePopup
                      onClose={closeAllPopups}
                      isOpen={isEditProfilePopupOpen}
                      onUpdateUser={handleEditUserInfo}
                      isLoading={isLoading}
                      onOverlayClick={closeByOverlay}
                    />

                    <PopupAddCard
                      onClose={closeAllPopups}
                      isOpen={isAddCardPopupOpen}
                      onAddCard={handleAddCard}
                      isLoading={isLoading}
                      onOverlayClick={closeByOverlay}
                    />

                    <EditAvatar
                      onClose={closeAllPopups}
                      isOpen={isEditAvatarPopupOpen}
                      onUpdateAvatar={handleUpdateAvatar}
                      isLoading={isLoading}
                      onOverlayClick={closeByOverlay}
                    />

                    <ConfirmationPopup
                      isOpen={isConfirmationPopupOpen}
                      onClose={closeAllPopups}
                      onCardDelete={handleCardDelete}
                      isLoading={isLoading}
                      onOverlayClick={closeByOverlay}
                    />

                    <ImagePopup
                      onClose={closeAllPopups}
                      isOpen={isImageViewerPopupOpen}
                      imageSrc={imageSrc}
                      altText={altText}
                      onOverlayClick={closeByOverlay}
                    />
                  </>
                }
              />
            </Route>
          </Routes>
        )}

        <ScrollButton />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
