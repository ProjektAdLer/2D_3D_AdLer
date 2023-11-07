import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import goalIcon from "../../../../../../Assets/icons/20-goal/goal-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";

export default function LearningSpaceGoalPanel() {
  const [viewModel] = useBuilder<
    LearningSpaceGoalPanelViewModel,
    LearningSpaceGoalPanelController
  >(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder);

  const [goals] = useObservable<string[]>(viewModel?.goals);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!isOpen) return null;
  return (
    <StyledModal
      showModal={isOpen}
      onClose={() => {
        viewModel.isOpen.Value = false;
      }}
    >
      <img
        className="w-4 mr-4 lg:w-10"
        src={goalIcon}
        alt="Learning-Goal-Icon"
      ></img>
      {!goals && (
        <div>Zu diesem Lernraum gibt es keine eingetragenen Lernziele!</div>
      )}
      {goals &&
        goals.map((goal, index) => {
          return <TextWithLineBreaks text={goal} key={index} />;
        })}
    </StyledModal>
  );
}
