import React, { useState } from "react";
import MainIcon from "../../icons/icon.svg";
import LightIcon from "../../icons/light.svg";
import "./header.scss";
export function HeaderComp() {
  const [theme, setTheme] = useState(true);

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  const storedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }
  const toggleTheme = () => {
    console.log(theme);
    if (theme) {
      setDark();
    } else {
      setLight();
    }
    setTheme(!theme);
  };
  return (
    <header className="Header">
      <img alt="Иконка Сайта" src={MainIcon}></img>
      <img
        onClick={toggleTheme}
        className="js-theme-switcher"
        alt="Кнопка изменения цвета"
        src={LightIcon}
      ></img>
    </header>
  );
}
