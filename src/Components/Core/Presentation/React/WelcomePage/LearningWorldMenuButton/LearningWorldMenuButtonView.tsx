import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import LearningWorldMenuButtonViewModel from "./LearningWorldMenuButtonViewModel";
import history from "history/browser";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useEffect } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function LearningWorldMenuButton({
  className,
}: AdLerUIComponent) {
  const [viewModel] = useBuilder<LearningWorldMenuButtonViewModel, undefined>(
    BUILDER_TYPES.ILearningWorldMenuButtonBuilder
  );
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase
  );

  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn
  );

  useEffect(() => {
    setUserLoggedIn(getLoginStatusUseCase.execute());
  }, [getLoginStatusUseCase, setUserLoggedIn]);

  return (
    <StyledButton
      className={tailwindMerge(className)}
      shape="freefloatleft"
      disabled={!userLoggedIn}
      onClick={() => history.push("/worldmenu")}
    >
      Gehe zum Lernwelt Menü
    </StyledButton>
  );
}
