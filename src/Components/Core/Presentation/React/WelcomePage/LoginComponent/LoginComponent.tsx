import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoginComponentController from "./LoginComponentController";
import LoginComponentViewModel from "./LoginComponentViewModel";
import moodleIcon from "../../../../../../Assets/icons/16-moodle/moodle-icon-nobg.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { createPortal } from "react-dom";
import LoginModal from "./LoginModal";
import React, { useEffect } from "react";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

/**
 * React Component that displays a login button. When clicked, a modal will be overlayed.
 */
export default function LoginComponent() {
  const [viewModel, controller] = useBuilder<
    LoginComponentViewModel,
    LoginComponentController
  >(BUILDER_TYPES.ILoginButtonBuilder);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase
  );

  const [, setModalVisible] = useObservable<boolean>(viewModel?.modalVisible);
  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn
  );

  useEffect(() => {
    const loginStatus = getLoginStatusUseCase.execute();
    setUserLoggedIn(loginStatus);
    setModalVisible(!loginStatus);
  }, [getLoginStatusUseCase, setUserLoggedIn, setModalVisible]);

  if (!controller || !viewModel) return null;

  return (
    <React.Fragment>
      <StyledButton
        color={userLoggedIn ? "success" : "default"}
        onClick={() => setModalVisible(true)}
      >
        <img src={moodleIcon} alt="Moodle-Icon"></img>
      </StyledButton>
      {createPortal(
        <div className="z-10">
          <LoginModal viewModel={viewModel} controller={controller} />
        </div>,
        document.body
      )}
    </React.Fragment>
  );
}
