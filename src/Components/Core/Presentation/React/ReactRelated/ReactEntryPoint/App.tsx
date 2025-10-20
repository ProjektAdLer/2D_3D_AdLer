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
import LoadingScreenHomePageInformation from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenHomePageInformation";
import i18next from "i18next";
import NarrativeFrameworkLoadingScreenContainer from "~ReactComponents/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainer";
import Settings from "./Settings";
import Privacy from "./Privacy";

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
          content={<NarrativeFrameworkLoadingScreenContainer />}
          i18nKeys={{
            namespace: "learningSpace",
            button: "enterLearningSpace",
            onLoading: "loadLearningSpace",
            onLoadingFinished: "finishedLoadingLearningSpace",
          }}
          tooltip={i18next
            .t("openLearningSpaceToolTip", { ns: "learningSpace" })
            .toString()}
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
          tooltip={i18next
            .t("openLearningWorldToolTip", { ns: "worldMenu" })
            .toString()}
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
  } else if (location?.pathname.includes("/settings")) {
    return (
      <>
        <Settings />
      </>
    );
  } else if (location?.pathname.includes("/privacy")) {
    return (
      <>
        <Privacy />
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
