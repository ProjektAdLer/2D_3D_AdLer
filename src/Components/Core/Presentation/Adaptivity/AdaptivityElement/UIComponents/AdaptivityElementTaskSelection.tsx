import { useEffect, useState } from "react";
import {
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { useTranslation } from "react-i18next";

import requiredTaskIcon from "../../../../../../Assets/icons/required.svg";
import solvedTaskIcon from "../../../../../../Assets/icons/check-solution.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import Observable from "src/Lib/Observable";

export function getAdaptivityQuestionStarState(
  question: AdaptivityQuestion | undefined,
): AdaptivityElementDifficultyStarState {
  if (question === undefined) return AdaptivityElementDifficultyStarState.Empty;
  else if (question.isRequired) {
    if (question.isCompleted === true)
      return AdaptivityElementDifficultyStarState.RequiredSolved;
    else if (question.isCompleted === false)
      return AdaptivityElementDifficultyStarState.RequiredTried;
    else return AdaptivityElementDifficultyStarState.RequiredUnsolved;
  } else {
    if (question.isCompleted === true)
      return AdaptivityElementDifficultyStarState.NotRequiredSolved;
    else if (question.isCompleted === false)
      return AdaptivityElementDifficultyStarState.NotRequiredTried;
    else return AdaptivityElementDifficultyStarState.NotRequiredUnsolved;
  }
}

export default function AdaptivityElementTaskSelection({
  tasks,
  reset,
  setHeaderText,
  onSelectTask,
}: Readonly<{
  tasks: AdaptivityTask[];
  reset: Observable<boolean>;
  setHeaderText: (headerText: string) => void;
  onSelectTask: (selectedTask: AdaptivityTask) => void;
}>) {
  const [taskButtons, setTaskButtons] = useState<JSX.Element[]>([]);
  const [resetting] = useObservable<boolean>(reset);

  const { t: translate } = useTranslation("learningElement");
  useEffect(() => {
    setHeaderText(translate("adaptivityIntro"));
  }, [setHeaderText, translate]);

  const taskToolTip = translate("taskToolTip").toString();
  const taskRequiredToolTip = translate("legendTaskRequired").toString();
  const taskSolvedToolTip = translate("legendTaskRequiredSolved").toString();

  useEffect(() => {
    setTaskButtons(
      tasks.map((task, i) => {
        const easyStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.easy,
          ),
        );
        const mediumStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.medium,
          ),
        );
        const hardStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.hard,
          ),
        );

        return (
          <div
            key={i.toString() + "_" + task.taskID}
            className="flex flex-col text-sm"
          >
            <StyledButton
              shape="freeFloatCenter"
              className="w-full max-w-2xl"
              onClick={() => onSelectTask(task)}
              title={taskToolTip}
              data-testid={`adaptivity-task-${task.taskID}`}
            >
              <div className="align-center grid h-full w-full grid-cols-7 items-center justify-between">
                <AdaptivityElementDifficultyStars
                  easyState={easyStatus}
                  mediumState={mediumStatus}
                  hardState={hardStatus}
                  starClassName="w-4 h-4 sm:w-6 sm:h-6 "
                />

                <p className="col-span-5 pl-4 text-start text-sm">
                  {task.taskTitle}
                </p>

                <div className="flex justify-end">
                  {task.isRequired && !task.isCompleted && (
                    <img
                      alt=""
                      className={"h-6 pl-4 lg:h-8 xl:pl-8"}
                      src={requiredTaskIcon}
                      title={taskRequiredToolTip}
                      data-testid={`adaptivity-star-required-notcompleted-${task.taskID}`}
                    />
                  )}
                  {task.isRequired && task.isCompleted && (
                    <img
                      alt=""
                      className={"h-6 pl-4 lg:h-8 xl:pl-8"}
                      src={solvedTaskIcon}
                      title={taskSolvedToolTip}
                      data-testid={`adaptivity-star-required-completed-${task.taskID}`}
                    />
                  )}
                  {!task.isRequired && <div className="w-16"></div>}
                </div>
              </div>
            </StyledButton>
          </div>
        );
      }),
    );
  }, [
    tasks,
    onSelectTask,
    resetting,
    taskSolvedToolTip,
    taskRequiredToolTip,
    taskToolTip,
  ]);

  return (
    <div className="grid justify-center gap-4 gap-x-8 lg:grid-cols-2">
      {taskButtons}
    </div>
  );
}
