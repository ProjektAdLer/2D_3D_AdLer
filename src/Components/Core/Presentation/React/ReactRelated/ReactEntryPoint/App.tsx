import "./App.css";
import Space from "./Space";
import WorldMenu from "./WorldMenu";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import history from "history/browser";
import { Location, Update } from "history";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    const unlisten = history.listen((update: Update) => {
      setLocation(update.location);
    });

    return () => {
      unlisten();
    };
  }, []);

  switch (location?.pathname) {
    default:
    case "/":
      return <WelcomePage />;
    case "/worldmenu":
      return <WorldMenu />;
    case "/space":
      return <Space />;
  }
};

export default App;
