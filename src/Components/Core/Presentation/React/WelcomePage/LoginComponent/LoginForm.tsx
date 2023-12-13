import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoginComponentController from "./LoginComponentController";
import LoginComponentViewModel from "./LoginComponentViewModel";
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

/**
 * React Component that displays a login button. When clicked, a modal will be overlayed.
 */
export default function LoginForm({ className }: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    LoginComponentViewModel,
    LoginComponentController
  >(BUILDER_TYPES.ILoginButtonBuilder);
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase
  );
  const { t } = useTranslation("start");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = React.useCallback(() => {
    controller.login(userName, password);
  }, [controller, userName, password]);

  const [, setModalVisible] = useObservable<boolean>(viewModel?.modalVisible);
  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn
  );
  const [loginFailed] = useObservable<boolean>(viewModel?.loginFailed);

  useEffect(() => {
    const loginStatus = getLoginStatusUseCase.execute();
    setUserLoggedIn(loginStatus.isLoggedIn);
  }, [getLoginStatusUseCase, setUserLoggedIn, setModalVisible]);

  if (!controller || !viewModel) return null;

  return (
    <div className={tailwindMerge(className)}>
      <h2 className="col-span-6 col-start-2 row-start-2 pt-2 text-xl font-extrabold text-center justify-self-center portrait:text-sm lg:text-xl text-adlerdarkblue portrait:row-start-1 portrait:self-end portrait:col-start-1 portrait:col-span-8">
        {userLoggedIn
          ? t("loginSuccessfullSubheading")
          : t("moodleLoginSubheading")}
      </h2>

      {!userLoggedIn && (
        <div>
          <form
            className="flex items-center justify-center col-span-6 col-start-2 row-start-2 gap-2 m-4 text-xl font-bold text-center rounded-lg portrait:self-end portrait:row-start-1 portrait:scale-50 portrait:col-start-1 portrait:col-span-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <StyledInputField
              className="text-adlerdarkblue"
              data-testid="userName"
              placeholder={t("userName").toString()}
              onChange={(newVal) => {
                setUserName(newVal.target.value);
              }}
            />
            <StyledPasswordField
              className="text-adlerdarkblue"
              data-testid="password"
              placeholder={t("password").toString()}
              onChange={(newVal) => {
                setPassword(newVal.target.value);
              }}
            />
            <StyledButton
              shape="freefloatcenter"
              data-testid="loginButton"
              onClick={handleSubmit}
            >
              <p>{t("loginButton")}</p>
            </StyledButton>
          </form>

          {loginFailed && (
            <div className="bg-red-100 rounded-lg">
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {t("loginFail")}
              </p>
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {t("loginFailAdvise")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
