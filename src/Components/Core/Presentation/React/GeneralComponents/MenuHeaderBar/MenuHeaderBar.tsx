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
import ExperiencePointsPanel from "../../LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanel";
import { useTranslation } from "react-i18next";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";

type MenuHeaderBarProps = {
  className: string;
  location: "world" | "space" | "editor";
  externContent?: {
    contentLocation: "world" | "space" | "editor";
    content: JSX.Element;
  };
};

export default function MenuHeaderBar(props: Readonly<MenuHeaderBarProps>) {
  const [viewModel, controller] = useBuilder<
    MenuHeaderBarViewModel,
    MenuHeaderBarController
  >(BUILDER_TYPES.IHeaderBarBuilder);

  const [currentWorldName] = useObservable<string>(viewModel?.currentWorldName);
  const [gradingStyle] = useObservable<GradingStyle | undefined>(
    viewModel?.gradingStyle,
  );

  const { t: translate } = useTranslation("start");

  if (!viewModel || !controller) return null;

  return (
    <div
      className={tailwindMerge(props.className, "flex place-content-stretch")}
    >
      <div className="flex items-center w-1/2 place-content-stretch justify-self-start ">
        <StyledButton onClick={controller.onHomeButtonClicked} className="mr-4">
          <img className="w-10 xl:w-12 " src={homeIcon} alt="Home Icon" />
        </StyledButton>
        {props.location === "space" && (
          <StyledButton onClick={controller.onLearningWorldButtonClicked}>
            <img className="w-10 xl:w-12" src={worldIcon} alt="World Icon" />
          </StyledButton>
        )}
        {props.externContent &&
          props.location === props.externContent.contentLocation &&
          props.externContent.content}
      </div>
      <div className="flex items-center justify-center w-full">
        <StyledContainer
          className="text-xl truncate lg:text-4xl font-[roboto] py-2"
          textColor="darkblue"
        >
          {props.location === "space" ? currentWorldName : null}
          {props.location === "world"
            ? translate("learningWorldMenuTitle").toString()
            : null}
          {props.location === "editor"
            ? translate("avatarEditorTitle").toString()
            : null}
        </StyledContainer>
      </div>
      <div className="flex justify-end w-1/2 ">
        {props.location === "space" && gradingStyle && (
          <ExperiencePointsPanel gradingStyle={gradingStyle} isButton={true} />
        )}
        <HelpDeskButton />
        <HelpDeskModal />
      </div>
    </div>
  );
}
