import debugIcon from "../../../../../../Assets/icons/09-1-bug-icon/bug-icon.svg";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";

export default function LogExportButton() {
  const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  return (
    <button
      title="Log Export"
      onClick={() => logger.exportLog()}
      className="flex absolute bottom-2 right-20 items-center justify-center text-sm rounded-lg bg-buttonbgblue hover:cursor-pointer hover:text-buttonbgblue hover:bg-adlerdarkblue lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue overflow-hidden lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square"
    >
      <img alt="" className={"h-10 lg:h-12"} src={debugIcon}></img>
    </button>
  );
}