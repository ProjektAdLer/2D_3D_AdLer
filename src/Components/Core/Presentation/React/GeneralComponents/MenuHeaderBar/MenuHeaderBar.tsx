import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import MenuHeaderBarController from "./MenuHeaderBarController";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import homeIcon from "../../../../../../Assets/icons/home.svg";
import worldIcon from "../../../../../../Assets/icons/world-menu.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import HelpDeskModal from "../HelpDeskModal/HelpDeskModal";
import HelpDeskButton from "../HelpDeskButton/HelpDeskButton";
import { useTranslation } from "react-i18next";

interface MenuHeaderBarProps extends React.HTMLAttributes<HTMLDivElement> {
  location: "world" | "space" | "editor";
}

export default function MenuHeaderBar({
  className,
  location,
  ...rest
}: React.DetailedHTMLProps<MenuHeaderBarProps, HTMLDivElement>) {
  const [viewModel, controller] = useBuilder<
    MenuHeaderBarViewModel,
    MenuHeaderBarController
  >(BUILDER_TYPES.IHeaderBarBuilder);

  const [currentWorldName] = useObservable<string>(viewModel?.currentWorldName);

  const { t: translate } = useTranslation("worldMenu");

  if (!viewModel || !controller) return null;

  return (
    <div className={tailwindMerge(className, "flex place-content-stretch")}>
      <div className="flex items-center w-1/2 place-content-stretch justify-self-start ">
        <StyledButton onClick={controller.onHomeButtonClicked} className="mr-4">
          <img className="w-10 xl:w-12 " src={homeIcon} alt="Home Icon" />
        </StyledButton>
        {location === "space" && (
          <StyledButton onClick={controller.onLearningWorldButtonClicked}>
            <img className="w-10 xl:w-12" src={worldIcon} alt="World Icon" />
          </StyledButton>
        )}
      </div>
      <div className="flex justify-center w-full">
        <StyledContainer
          className="text-xl truncate lg:text-4xl font-[roboto]"
          textColor="darkblue"
        >
          {location === "space" ? currentWorldName : null}
          {location === "world"
            ? translate("learningWorldMenuTitle").toString()
            : null}
        </StyledContainer>
      </div>
      <div className="flex justify-end w-1/2 ">
        <HelpDeskButton />
        <HelpDeskModal />
      </div>
    </div>
  );
}
