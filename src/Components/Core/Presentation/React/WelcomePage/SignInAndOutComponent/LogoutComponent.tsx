import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";
import SignInAndOutComponentController from "./SignInAndOutComponentController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import moodleIcon from "../../../../../../Assets/icons/moodle.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LogoutComponent({
  className,
}: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SignInAndOutComponentViewModel,
    SignInAndOutComponentController
  >(BUILDER_TYPES.ISignInAndOutComponentBuilder);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase,
  );

  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn,
  );
  const [userName, setUserName] = useObservable<string>(viewModel?.userName);

  const { t: translate } = useTranslation("start");

  useEffect(() => {
    const loginStatus = getLoginStatusUseCase.execute();
    setUserLoggedIn(loginStatus.isLoggedIn);
    setUserName(loginStatus.isLoggedIn ? loginStatus.userName! : "");
  }, [getLoginStatusUseCase, setUserLoggedIn, setUserName]);

  return (
    <div className={tailwindMerge(className)}>
      {userLoggedIn && (
        <StyledButton
          color={userLoggedIn ? "success" : "default"}
          shape="freeFloatLeft"
          data-testid="login-button"
          className="flex h-10 gap-2 m-1 !border-b-[1px] !border-r-[1px] pointer-events-none w-fit mobile-landscape:w-32 border-none"
        >
          <img className="w-10" src={moodleIcon} alt="Moodle-Icon"></img>
          {userLoggedIn && (
            <p className="text-sm mobile-landscape:text-xs font-regular portrait:hidden">
              {translate("loginName", { userName: userName })}
            </p>
          )}
        </StyledButton>
      )}
      {userLoggedIn && (
        <StyledButton
          shape="freeFloatLeft"
          className="h-6 !bg-red-300 w-fit absolute bottom-12 right-1 portrait:-left-2 portrait:-top-4"
          onClick={() => controller.logout()}
          data-testid="logout"
          title={translate("LogoutButtonToolTip").toString()}
        >
          <p className="text-xs rounded-lg portrait:text-2xs">
            {translate("logout").toString()}
          </p>
        </StyledButton>
      )}
    </div>
  );
}
