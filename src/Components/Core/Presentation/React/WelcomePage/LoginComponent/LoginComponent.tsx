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
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

/**
 * React Component that displays a login button. When clicked, a modal will be overlayed.
 */
export default function LoginComponent({
  className,
}: Readonly<AdLerUIComponent>) {
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
    <div className={tailwindMerge(className)}>
      <StyledButton
        color={userLoggedIn ? "success" : "default"}
        shape="freefloatleft"
        onClick={() => setModalVisible(true)}
        data-testid="login-button"
        className="flex h-16 gap-2 m-1 border-none pointer-events-none w-fit"
      >
        <img className="w-10" src={moodleIcon} alt="Moodle-Icon"></img>
        <p className="text-lg font-regular">Eingeloggt als "Username"</p>
      </StyledButton>

      {userLoggedIn && (
        <StyledButton
          shape="freefloatleft"
          className="h-10 !bg-red-300 w-fit"
          onClick={() => controller.logout()}
          data-testid="logout"
        >
          <p className="text-xs font-bold break-words rounded-lg">
            debug moodle logout
          </p>
        </StyledButton>
      )}

      {createPortal(
        <div className="z-10">
          <LoginModal viewModel={viewModel} controller={controller} />
        </div>,
        document.body
      )}
    </div>
  );
}
