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
import AvatarEditor from "src/Components/Core/Presentation/AvatarEditor/AvatarEditor";
import LoadingScreenControlsExplanation from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenControlsExplanation";
import LoadingScreenHomePageInformation from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenHomePageInformation";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [location, setLocation] = useState<Location>(history.location);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase,
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
    if (!userLoggedIn) {
      history.replace("/");
    }
  }, [getLoginStatusUseCase]);

  if (location?.pathname.includes("/spacedisplay")) {
    return (
      <>
        <LoadingScreen
          content={<LoadingScreenControlsExplanation />}
          i18nKeys={{
            namespace: "learningSpace",
            button: "enterLearningSpace",
            onLoading: "loadLearningSpace",
            onLoadingFinished: "finishedLoadingLearningSpace",
          }}
        />
        <LearningSpace />
        <InternetLossModal />
      </>
    );
  } else if (location?.pathname.includes("/worldmenu")) {
    return (
      <>
        <LoadingScreen
          content={<LoadingScreenHomePageInformation />}
          i18nKeys={{
            namespace: "worldMenu",
            button: "finishedLearningWorldOverview",
            onLoading: "loadLearningWorldOverview",
          }}
          autoClose={true}
        />
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
  } else if (location?.pathname.includes("/avatarEditor")) {
    return (
      <>
        <AvatarEditor />
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
