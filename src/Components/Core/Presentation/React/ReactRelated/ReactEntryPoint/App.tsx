import "./App.css";
import Space from "./Space";
import WorldMenu from "./WorldMenu";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="worldmenu">
          <Route index element={<WorldMenu />} />
        </Route>
        <Route path="space" element={<Space />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
