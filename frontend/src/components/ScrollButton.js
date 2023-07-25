import React, { useEffect, useState } from "react";

const ScrollButton = () => {
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [showTimer, setShowTimer] = useState(null);
  const [hideTimer, setHideTimer] = useState(null);
  const scrollButtonRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollpos = window.pageYOffset;
      if (prevScrollpos > currentScrollpos && currentScrollpos > 0) {
        cancelHide();
        scheduleShow();
      } else {
        cancelShow();
        scheduleHide();
      }
      setPrevScrollpos(currentScrollpos);
    };

    const scheduleShow = () => {
      if (!showTimer) {
        setShowTimer(window.requestAnimationFrame(showButton));
      }
    };

    const scheduleHide = () => {
      if (!hideTimer) {
        setHideTimer(window.requestAnimationFrame(hideButton));
      }
    };

    const cancelShow = () => {
      if (showTimer) {
        window.cancelAnimationFrame(showTimer);
        setShowTimer(null);
      }
    };

    const cancelHide = () => {
      if (hideTimer) {
        window.cancelAnimationFrame(hideTimer);
        setHideTimer(null);
      }
    };

    const showButton = () => {
      scrollButtonRef.current.classList.remove("slide-out");
      scrollButtonRef.current.style.display = "block";
      setShowTimer(null);
    };

    const hideButton = () => {
      scrollButtonRef.current.classList.add("slide-out");
      setHideTimer(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelShow();
      cancelHide();
    };
  }, [prevScrollpos, showTimer, hideTimer]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="scroll-to-top-button"
      ref={scrollButtonRef}
      onClick={scrollToTop}
    ></button>
  );
};

export default ScrollButton;
