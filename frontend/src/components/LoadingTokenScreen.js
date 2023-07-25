import React from "react";
import LoadingAnimation from "../images/Loading.svg";

export default function LoadingTokenScreen() {
  return (
    <div className="loading__container">
      <img
        src={LoadingAnimation}
        alt="Загрузка страницы"
        className="loading__animation"
      />
    </div>
  );
}
