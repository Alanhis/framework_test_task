import React from "react";
import "./App.scss";
import { HeaderComp } from "./component/header/index";
import { MainComp } from "./component/main";
function App() {
  return (
    <div className="App">
      <HeaderComp />
      <MainComp />
    </div>
  );
}

export default App;
