import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";
import history from "history/browser";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useEffect } from "react";

export default function WorldMenuButton() {
  const [viewModel] = useBuilder<WorldMenuButtonViewModel, undefined>(
    BUILDER_TYPES.IWorldMenuButtonBuilder
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
    <div>
      <StyledButton
        shape="freefloatleft"
        disabled={!userLoggedIn}
        onClick={() => history.push("/worldmenu")}
      >
        Gehe zum Lernraum Menü
      </StyledButton>
    </div>
  );
}
