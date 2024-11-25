import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import adlerHomepage from "../../../../../../../Assets/misc/AdLerHomepage.jpg";
import tailwindMerge from "src/Components/Core/Presentation/Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useTranslation } from "react-i18next";

export default function LoadingScreenHomePageInformation({
  className,
}: Readonly<AdLerUIComponent<{}>>) {
  const { t: translate } = useTranslation("loadingScreen");

  return (
    <div className={tailwindMerge(className, "grid grid-cols-10")}>
      <h1 className="col-span-6 col-start-3 p-2 font-bold text-center portrait:pb-6 portrait:col-span-10 portrait:col-start-1 text-adlerdarkblue pd-4">
        {translate("websiteInfoText")}
      </h1>
      <StyledButton
        shape="freeFloatCenterNoPadding"
        containerClassName="col-span-4 col-start-4 p-2 portrait:col-span-8 portrait:col-start-2"
        feedback="nothing"
      >
        <div className="bg-slate-400">
          <a
            href="https://projekt-adler.eu"
            target="_blank"
            rel="noreferrer"
            className="opacity-75 hover:opacity-100"
          >
            <img src={adlerHomepage} alt="adlerHomepage" />
          </a>
        </div>
      </StyledButton>
    </div>
  );
}
