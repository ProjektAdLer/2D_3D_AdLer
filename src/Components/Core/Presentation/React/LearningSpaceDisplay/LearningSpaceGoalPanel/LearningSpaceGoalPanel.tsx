import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useTranslation } from "react-i18next";

import GoalIcon from "../../../../../../Assets/icons/goals.svg";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";

export default function LearningSpaceGoalPanel() {
  const [viewModel, controller] = useBuilder<
    LearningSpaceGoalPanelViewModel,
    LearningSpaceGoalPanelController
  >(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder);

  const [goals] = useObservable<string[]>(viewModel?.goals);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  const { t: translate } = useTranslation("spaceGoal");

  if (!viewModel || !controller || goals?.length <= 0) return null;

  return (
    <div>
      <StyledButton
        onClick={controller.openOrCloseGoals}
        title={translate("learningGoalToolTip").toString()}
      >
        <img
          className="w-[48px] lg:w-[69px] hover:cursor-pointer"
          src={GoalIcon}
          alt="Lernziel Icon"
        ></img>
      </StyledButton>

      {isOpen && (
        <StyledContainer className="fixed z-10 max-w-2xl max-h-[90vh] p-2 overflow-auto rounded-lg top-12 portrait:right-12 right-0 md:top-20 lg:right-40 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
          <div className="flex flex-col gap-4 m-2">
            {goals && (
              <div className="flex flex-row">
                <div>
                  {/* Header */}
                  <div className="flex flex-row ">
                    <img
                      src={GoalIcon}
                      alt="Lernziel Logo"
                      className="h-4 pr-2 lg:h-6"
                    />
                    {goals.length === 1 && (
                      <h3 className="pb-1 text-sm font-semibold lg:text-xl">
                        {translate("learningGoalHeader_singular")}
                      </h3>
                    )}
                    {goals.length > 1 && (
                      <h3 className="pb-1 text-sm font-semibold lg:text-xl">
                        <p>{translate("learningGoalsHeader_plural")}</p>
                      </h3>
                    )}
                  </div>
                  {/* Learning Goals */}
                  {goals.length === 1 && (
                    <div className="text-xs lg:text-sm">
                      <div className="my-2">
                        <TextWithLineBreaks text={goals[0]} />
                      </div>
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
                  <CloseButton
                    onClick={() => {
                      controller.closePanel();
                    }}
                  >
                    {translate("confirmButton")}
                  </CloseButton>
                </div>
              </div>
            )}
          </div>
        </StyledContainer>
      )}
    </div>
  );
}
