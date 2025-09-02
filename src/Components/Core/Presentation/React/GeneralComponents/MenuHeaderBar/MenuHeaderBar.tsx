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
      className={tailwindMerge(
        props.className,
        "flex place-content-stretch lg:p-2 tablet-portrait:p-2",
      )}
    >
      <div className="flex w-1/2 place-content-stretch items-center justify-self-start">
        <StyledButton
          onClick={controller.onHomeButtonClicked}
          className="mr-4"
          title={translate("HomeButtonToolTip").toString()}
          data-testid="homebutton"
        >
          <img className="w-10 xl:w-12" src={homeIcon} alt="Home Icon" />
        </StyledButton>
        {props.location === "space" && (
          <StyledButton
            onClick={controller.onLearningWorldButtonClicked}
            title={translate("LearningWorldButtonToolTip").toString()}
            data-testid="learningworldbutton"
          >
            <img className="w-10 xl:w-12" src={worldIcon} alt="World Icon" />
          </StyledButton>
        )}
        {props.externContent &&
          props.location === props.externContent.contentLocation &&
          props.externContent.content}
      </div>
      <div className="flex w-full items-center justify-center">
        <StyledContainer
          className="truncate py-2 font-[roboto] text-xl lg:text-4xl mobile-landscape:text-2xl tablet-portrait:text-2xl"
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
      <div className="flex w-1/2 items-center justify-end gap-4 lg:gap-8">
        {props.location === "space" && gradingStyle && (
          <div className="z-0 hidden items-center md:flex">
            <ExperiencePointsPanel
              gradingStyle={gradingStyle}
              isButton={false}
            />
          </div>
        )}
        <HelpDeskButton />
        <HelpDeskModal />
      </div>
    </div>
  );
}
