import logExportIcon from "../../../../../../Assets/icons/log-export.svg";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import { useTranslation } from "react-i18next";

export default function LogExportButton() {
  const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  const { t: translate } = useTranslation("helpMenu");

  return (
    <button
      title={translate("logToolTip").toString()}
      onClick={() => logger.exportLog()}
      className="font-regular flex aspect-square h-10 w-10 items-center justify-center rounded-lg border-b-4 border-l-[1px] border-r-4 border-t-[1px] border-adlerdarkblue bg-buttonbgblue text-sm text-adlerdarkblue transition duration-75 ease-in-out hover:cursor-pointer hover:bg-adlerdarkblue hover:text-buttonbgblue active:translate-x-1 active:translate-y-1 active:border-transparent sm:h-10 sm:w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 lg:text-xl"
      data-testid="bugreport"
    >
      <img alt="" className={"h-10 lg:h-12"} src={logExportIcon}></img>
    </button>
  );
}
