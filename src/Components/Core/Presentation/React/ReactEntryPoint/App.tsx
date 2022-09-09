import "./App.css";
import LearningRoom from "./LearningRoom";
import LearningWorldMenu from "./LearningWorldMenu";
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
          <Route index element={<LearningWorldMenu />} />
        </Route>
        <Route path="room" element={<LearningRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
