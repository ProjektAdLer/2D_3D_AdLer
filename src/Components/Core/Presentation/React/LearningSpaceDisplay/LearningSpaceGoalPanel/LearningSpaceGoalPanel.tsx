import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import tailwindMerge from "../../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

import GoalLogo from "../../../../../../Assets/icons/20-goal/goal-icon.svg";

export default function LearningSpaceGoalPanel() {
  const [viewModel] = useBuilder<
    LearningSpaceGoalPanelViewModel,
    LearningSpaceGoalPanelController
  >(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder);

  const [goals] = useObservable<string[]>(viewModel?.goals);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!isOpen) return null;
  return (
    <StyledContainer className="z-10 fixed top-12 md:top-20 lg:right-40 max-w-2xl p-2 rounded-lg bg-buttonbgblue overflow-hidden">
      <div className="flex flex-col gap-4 m-2">
        {!goals ||
          (goals.length === 0 && (
            <div>Zu diesem Lernraum gibt es keine eingetragenen Lernziele!</div>
          ))}
        {goals && (
          <div className="flex flex-row ">
            <div>
              <div className="flex flex-row justify-center">
                <img
                  src={GoalLogo}
                  alt="Lernziel Logo"
                  className="h-4 lg:h-6 pr-2"
                />
                <h3 className="text-sm lg:text-xl font-semibold pb-1">
                  Lernziele
                </h3>
              </div>

              <ul className="ml-4 list-disc text-xs lg:text-sm">
                {goals.map((goal, index) => {
                  return (
                    <li key={index}>
                      <TextWithLineBreaks text={goal} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col pl-4 justify-end">
              <StyledButton
                shape="closebutton"
                onClick={() => {
                  viewModel.isOpen.Value = false;
                }}
              >
                OK
              </StyledButton>
            </div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}
