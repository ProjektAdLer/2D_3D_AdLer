import { useCallback } from "react";
import bugReportIcon from "../../../../../../Assets/icons/bug-report.svg";
import { useTranslation } from "react-i18next";

export default function BugReportButton() {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noreferrer");
  }, []);

  const { t: translate } = useTranslation("helpMenu");

  return (
    <button
      onClick={() =>
        openInNewTab("https://github.com/ProjektAdLer/2D_3D_AdLer/issues")
      }
      className="font-regular flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded-lg border-b-4 border-l-[1px] border-r-4 border-t-[1px] border-adlerdarkblue bg-buttonbgblue text-sm text-adlerdarkblue transition duration-75 ease-in-out hover:cursor-pointer hover:bg-adlerdarkblue hover:text-buttonbgblue active:translate-x-1 active:translate-y-1 active:border-transparent sm:h-10 sm:w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 lg:text-xl"
      title={translate("bugToolTip").toString()}
      data-testid="bugreport"
    >
      <img alt="" className={"h-10 lg:h-12"} src={bugReportIcon}></img>
    </button>
  );
}
