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
      className="flex items-center justify-center text-sm rounded-lg bg-buttonbgblue hover:cursor-pointer hover:text-buttonbgblue hover:bg-adlerdarkblue lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square"
    >
      <img alt="" className={"h-10 lg:h-12"} src={logExportIcon}></img>
    </button>
  );
}
