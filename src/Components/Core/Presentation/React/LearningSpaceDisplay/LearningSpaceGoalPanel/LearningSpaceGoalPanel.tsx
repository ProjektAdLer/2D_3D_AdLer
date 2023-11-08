import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
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
      title="Lernziele"
      showModal={isOpen}
      onClose={() => {
        viewModel.isOpen.Value = false;
      }}
    >
      <div className="flex flex-col gap-4 m-2">
        {!goals ||
          (goals.length === 0 && (
            <div>Zu diesem Lernraum gibt es keine eingetragenen Lernziele!</div>
          ))}
        {goals && (
          <ul className="ml-4 list-disc">
            {goals.map((goal, index) => {
              return (
                <li key={index}>
                  <TextWithLineBreaks text={goal} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </StyledModal>
  );
}
