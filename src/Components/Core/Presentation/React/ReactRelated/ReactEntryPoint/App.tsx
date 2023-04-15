import LearningSpace from "./LearningSpace";
import LearningSpaceMenu from "./LearningSpaceMenu";
import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import history from "history/browser";
import { Location, Update } from "history";
import LearningWorldMenu from "./LearningWorldMenu";

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

  if (location?.pathname.includes("/spacedisplay")) {
    return <LearningSpace />;
  } else if (location?.pathname.includes("/worldmenu")) {
    return <LearningWorldMenu />;
  } else if (location?.pathname.includes("/spacemenu")) {
    return <LearningSpaceMenu />;
  } else {
    return <WelcomePage />;
  }
};

export default App;
