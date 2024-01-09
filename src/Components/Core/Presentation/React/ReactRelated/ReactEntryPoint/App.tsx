import "./App.css";
import LearningSpace from "./LearningSpace";
import LearningSpaceMenu from "./LearningSpaceMenu";
import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import history from "history/browser";
import { Location, Update } from "history";
import LearningWorldMenu from "./LearningWorldMenu";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import InternetLossModal from "~ReactComponents/GeneralComponents/InternetLossModal/InternetLossModal";
import LoadingScreen from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreen";
import "src/localize/i18next-config";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [location, setLocation] = useState<Location>(history.location);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase
  );

  useEffect(() => {
    const unlisten = history.listen((update: Update) => {
      setLocation(update.location);
    });

    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    let userLoggedIn = getLoginStatusUseCase.execute().isLoggedIn;
    console.log(userLoggedIn);
    if (!userLoggedIn) {
      history.replace("/");
    }
  }, [getLoginStatusUseCase]);

  if (location?.pathname.includes("/spacedisplay")) {
    return (
      <>
        <LoadingScreen />
        <LearningSpace />
        <InternetLossModal />
      </>
    );
  } else if (location?.pathname.includes("/worldmenu")) {
    return (
      <>
        <LearningWorldMenu />
        <InternetLossModal />
      </>
    );
  } else if (location?.pathname.includes("/spacemenu")) {
    return (
      <>
        <LearningSpaceMenu />
        <InternetLossModal />
      </>
    );
  } else {
    return (
      <>
        <WelcomePage />
        <InternetLossModal />
      </>
    );
  }
};

export default App;
