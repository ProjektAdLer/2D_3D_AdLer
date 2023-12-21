import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";
import SignInAndOutComponentController from "./SignInAndOutComponentController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import moodleIcon from "../../../../../../Assets/icons/16-moodle/moodle-icon-nobg.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useEffect } from "react";

export default function LogoutComponent({
  className,
}: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SignInAndOutComponentViewModel,
    SignInAndOutComponentController
  >(BUILDER_TYPES.ISignInAndOutComponentBuilder);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase
  );

  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn
  );
  const [userName, setUserName] = useObservable<string>(viewModel?.userName);

  useEffect(() => {
    const loginStatus = getLoginStatusUseCase.execute();
    setUserLoggedIn(loginStatus.isLoggedIn);
    setUserName(loginStatus.isLoggedIn ? loginStatus.userName! : "");
  }, [getLoginStatusUseCase, setUserLoggedIn, setUserName]);

  return (
    <div className={tailwindMerge(className)}>
      <StyledButton
        color={userLoggedIn ? "success" : "default"}
        shape="freefloatleft"
        data-testid="login-button"
        className="flex h-10 gap-2 m-1 !border-b-[1px] !border-r-[1px] pointer-events-none w-fit"
      >
        <img className="w-10" src={moodleIcon} alt="Moodle-Icon"></img>
        {userLoggedIn && (
          <p className="text-sm font-regular portrait:hidden">
            {"Eingeloggt als " + userName}
          </p>
        )}
      </StyledButton>

      {userLoggedIn && (
        <StyledButton
          shape="freefloatleft"
          className="h-6 !bg-red-300 w-fit absolute bottom-[45px] right-1 portrait:-left-2 portrait:-top-4"
          onClick={() => controller.logout()}
          data-testid="logout"
        >
          <p className="text-xs rounded-lg">Ausloggen</p>
        </StyledButton>
      )}
    </div>
  );
}
