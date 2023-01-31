import "./App.css";
import Space from "./Space";
import SpaceMenu from "./SpaceMenu";
import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import history from "history/browser";
import { Location, Update } from "history";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [location, setLocation] = useState<Location>(history.location);

  useEffect(() => {
    const unlisten = history.listen((update: Update) => {
      setLocation(update.location);
    });

    return () => {
      unlisten();
    };
  }, []);

  if (location?.pathname.includes("/space")) {
    return <Space />;
  } else if (location?.pathname.includes("/spacemenu")) {
    return <SpaceMenu />;
  } else {
    return <WelcomePage />;
  }
};

export default App;
