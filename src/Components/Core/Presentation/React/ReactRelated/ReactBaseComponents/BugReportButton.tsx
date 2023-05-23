import debugIcon from "../../../../../../Assets/icons/09-debug/debug-icon-nobg.svg";

export default function BugReportButton() {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <button
      onClick={() => openInNewTab("https://bugreport.projekt-adler.eu")}
      className="flex absolute bottom-4 right-4 items-center text-sm rounded-lg hover:cursor-pointer hover:text-buttonbgblue hover:bg-adlerdarkblue lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue overflow-hidden"
    >
      <img alt="" className={"h-6 lg:h-8 pr-2"} src={debugIcon}></img>
      Bug Report
    </button>
  );
}
