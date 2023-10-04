import tailwindMerge from "../../../Utils/TailwindMerge";

import requiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-solved-icon.svg";
import requiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-unsolved-icon.svg";
import notRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-solved-icon.svg";
import notRequiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-unsolved-icon.svg";

export enum AdaptivityElementDifficultyStarState {
  Empty,
  RequiredSolved,
  RequiredTried,
  RequiredUnsolved,
  NotRequiredSolved,
  NotRequiredTried,
  NotRequiredUnsolved,
}

enum AdaptivityElementQuestionDifficulty {
  Easy,
  Medium,
  Hard,
}

// TODO: add more star icons here
function getIcon(
  difficulty: AdaptivityElementQuestionDifficulty,
  status: AdaptivityElementDifficultyStarState
): string | undefined {
  switch (difficulty) {
    case AdaptivityElementQuestionDifficulty.Easy:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return requiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return "";
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return notRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return "";
      }
    case AdaptivityElementQuestionDifficulty.Medium:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return requiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return "";
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return notRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return "";
      }
    case AdaptivityElementQuestionDifficulty.Hard:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return requiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return "";
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return notRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return "";
      }
  }
}

function EmptyStarSlot({ className }: { className: string }): JSX.Element {
  return <div className={tailwindMerge(`${className}`)} />;
}

export default function AdaptivityElementDifficultyStars({
  easyState,
  mediumState,
  hardState,
  starClassName,
}: {
  easyState: AdaptivityElementDifficultyStarState;
  mediumState: AdaptivityElementDifficultyStarState;
  hardState: AdaptivityElementDifficultyStarState;
  starClassName: string;
}) {
  return (
    <div className="flex flex-row h-full">
      {easyState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Easy, easyState)}
        />
      ) : (
        <EmptyStarSlot className={starClassName} />
      )}
      {mediumState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Medium, mediumState)}
        />
      ) : (
        <EmptyStarSlot className={starClassName} />
      )}
      {hardState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Hard, hardState)}
        />
      ) : (
        <EmptyStarSlot className={starClassName} />
      )}
    </div>
  );
}
