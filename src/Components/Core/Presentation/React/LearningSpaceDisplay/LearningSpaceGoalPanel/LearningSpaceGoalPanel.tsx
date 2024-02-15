import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

import GoalLogo from "../../../../../../Assets/icons/20-goal/goal-icon.svg";
import GoalIcon from "../../../../../../Assets/icons/20-goal/goal-icon-adlerblue-bg.svg";

export default function LearningSpaceGoalPanel() {
  const [viewModel, controller] = useBuilder<
    LearningSpaceGoalPanelViewModel,
    LearningSpaceGoalPanelController
  >(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder);

  const [goals] = useObservable<string[]>(viewModel?.goals);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller || !goals || !goals[0]) return null;

  return (
    <>
      <img
        className="w-[48px] lg:w-[69px]"
        src={GoalIcon}
        onClick={controller.openPanel}
        alt="Lernziel Icon"
      ></img>

      {isOpen && (
        <StyledContainer className="fixed z-10 max-w-2xl p-2 overflow-hidden rounded-lg top-12 right-2 md:top-20 lg:right-40 bg-buttonbgblue">
          <div className="flex flex-col gap-4 m-2">
            {goals && (
              <div className="flex flex-row">
                <div>
                  <div className="flex flex-row ">
                    <img
                      src={GoalLogo}
                      alt="Lernziel Logo"
                      className="h-4 pr-2 lg:h-6"
                    />
                    {goals.length === 1 && (
                      <h3 className="pb-1 text-sm font-semibold lg:text-xl">
                        Lernziel
                      </h3>
                    )}
                    {goals.length > 1 && (
                      <h3 className="pb-1 text-sm font-semibold lg:text-xl">
                        Lernziele
                      </h3>
                    )}
                  </div>

                  {goals.length === 1 && (
                    <div className=" text-xs lg:text-sm ">
                      {goals.map((goal, index) => {
                        return (
                          <div className="my-2" key={index}>
                            <TextWithLineBreaks text={goal} />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {goals.length > 1 && (
                    <ul className="ml-4 text-xs list-disc lg:text-sm ">
                      {goals.map((goal, index) => {
                        return (
                          <li className="my-2" key={index}>
                            <TextWithLineBreaks text={goal} />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col justify-end pl-4">
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
      )}
    </>
  );
}
