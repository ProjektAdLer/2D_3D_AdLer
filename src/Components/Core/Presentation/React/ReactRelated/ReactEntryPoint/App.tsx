import "./App.css";
import Space from "./Space";
import WorldMenu from "./WorldMenu";
import React, { useEffect, useState } from "react";
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

  if (location?.pathname.includes("/space")) {
    return <Space />;
  } else if (location?.pathname.includes("/worldmenu")) {
    return <WorldMenu />;
  } else {
    return <WelcomePage />;
  }
};

export default App;
