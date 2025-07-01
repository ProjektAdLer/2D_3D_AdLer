import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import SignInAndOutComponentController from "./SignInAndOutComponentController";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import React, { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import StyledInputField from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledInputField";
import StyledPasswordField from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledPasswordField";
import { useTranslation } from "react-i18next";
import ILoadAvatarConfigUseCase from "src/Components/Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";

/**
 * React Component that displays a login button. When clicked, a modal will be overlayed.
 */
export default function LoginComponent({
  className,
}: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SignInAndOutComponentViewModel,
    SignInAndOutComponentController
  >(BUILDER_TYPES.ISignInAndOutComponentBuilder);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase,
  );
  const loadAvatarConfigUseCase = useInjection<ILoadAvatarConfigUseCase>(
    USECASE_TYPES.ILoadAvatarConfigUseCase,
  );
  const { t: translate } = useTranslation("start");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = React.useCallback(() => {
    controller.login(userName, password);
  }, [controller, userName, password]);

  const [, setModalVisible] = useObservable<boolean>(viewModel?.modalVisible);
  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn,
  );
  const [loginFailed] = useObservable<boolean>(viewModel?.loginFailed);

  useEffect(() => {
    const loginStatus = getLoginStatusUseCase.execute();
    setUserLoggedIn(loginStatus.isLoggedIn);
    if (loginStatus.isLoggedIn) {
      const loadConfig = async () => {
        await loadAvatarConfigUseCase.executeAsync();
      };
      loadConfig();
    }
  }, [
    getLoginStatusUseCase,
    loadAvatarConfigUseCase,
    setUserLoggedIn,
    setModalVisible,
  ]);

  if (!controller || !viewModel) return null;

  return (
    <div className={tailwindMerge(className)}>
      <h2 className="col-span-6 col-start-2 row-start-2 pt-1 mt-2 text-xl font-extrabold text-center text-adlerdarkblue justify-self-center text-outline mobile-landscape:text-sm mobile-landscape:pt-0 mobile-landscape:mt-2 portrait:text-sm portrait:row-start-1 portrait:col-start-1 portrait:col-span-8 md:mt-4 lg:text-2xl">
        {userLoggedIn
          ? translate("loginSuccessfullSubheading")
          : translate("moodleLoginSubheading")}
      </h2>

      {!userLoggedIn && (
        <div className="flex flex-col items-start justify-center">
          <form
            className="flex flex-col items-center justify-center col-span-6 col-start-2 row-start-2 gap-2 m-4 text-xl font-bold text-center rounded-lg md:flex-row portrait:self-end portrait:row-start-1 mobile-landscape:scale-75 portrait:col-start-1 portrait:col-span-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <StyledInputField
              className="text-adlerdarkblue"
              data-testid="userName"
              placeholder={translate("userName").toString()}
              onChange={(newVal) => {
                setUserName(newVal.target.value);
              }}
              title={translate("NameInputToolTip").toString()}
            />
            <StyledPasswordField
              className="text-adlerdarkblue"
              data-testid="password"
              placeholder={translate("password").toString()}
              onChange={(newVal) => {
                setPassword(newVal.target.value);
              }}
              title={translate("PasswordInputToolTip").toString()}
            />
            <StyledButton
              shape="freeFloatCenter"
              data-testid="loginButton"
              onClick={handleSubmit}
              title={translate("LoginButtonToolTip").toString()}
            >
              <p>{translate("loginButton")}</p>
            </StyledButton>
          </form>

          {loginFailed && (
            <div className="z-50 self-center bg-red-100 rounded-lg mobile-landscape:w-64">
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {viewModel.errorMessage.Value}
              </p>
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {viewModel.errorMessageAdvise.Value}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
