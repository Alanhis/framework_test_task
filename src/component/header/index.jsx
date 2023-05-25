import React from "react";
import MainIcon from "../../icons/icon.svg";
import LightIcon from "../../icons/light.svg";
import "./header.scss";
export function HeaderComp() {
  return (
    <header className="Header">
      <img alt="Иконка Сайта" src={MainIcon}></img>
      <img alt="Кнопка изменения цвета" src={LightIcon}></img>
    </header>
  );
}
