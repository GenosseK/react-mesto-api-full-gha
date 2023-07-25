import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import cross from "../images/Close_Icon.svg";

function Header({ loggedIn, onLoggingOut, userEmail, buttonText, link }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <div className="header__container">
        {loggedIn && screenWidth > 390 && (
          <>
            <p className="header__email">{userEmail}</p>
            <Link className="header__link" to={link} onClick={onLoggingOut}>
              {buttonText}
            </Link>
          </>
        )}
        {loggedIn && screenWidth <= 390 && (
          <>
            <button
              className="header__hamburger"
              onClick={handleHamburgerClick}
            >
              <span className="header__hamburger-bar"></span>
              <span className="header__hamburger-bar"></span>
              <span className="header__hamburger-bar"></span>
            </button>
            <div className={`header__menu ${isMenuOpen ? "open" : ""}`}>
              <button
                className="header__close-button"
                onClick={handleCloseClick}
              >
                <img src={cross} alt="Close" className="header__close-icon" />
              </button>
              <p className="header__menu_email">{userEmail}</p>
              <Link
                className="header__menu_logout"
                to={link}
                onClick={onLoggingOut}
              >
                {buttonText}
              </Link>
            </div>
          </>
        )}
        {!loggedIn && (
          <>
            <p className="header__email">{userEmail}</p>
            <Link className="header__link" to={link} onClick={onLoggingOut}>
              {buttonText}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
