import debugIcon from "../../../../../../Assets/icons/09-debug/debug-icon-nobg.svg";

export default function BugReportButton() {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <button
      title="Bug Report"
      onClick={() => openInNewTab("https://bugreport.projekt-adler.eu")}
      className="flex absolute bottom-4 right-4 items-center justify-center text-sm rounded-lg bg-buttonbgblue hover:cursor-pointer hover:text-buttonbgblue hover:bg-adlerdarkblue lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue overflow-hidden lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square"
    >
      <img alt="" className={"h-6 lg:h-8 "} src={debugIcon}></img>
    </button>
  );
}