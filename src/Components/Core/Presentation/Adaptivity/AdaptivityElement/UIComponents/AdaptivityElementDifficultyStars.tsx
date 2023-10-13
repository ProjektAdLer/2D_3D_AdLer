import tailwindMerge from "../../../Utils/TailwindMerge";

import requiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-unsolved-icon.svg";
import notRequiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-unsolved-icon.svg";
import placeholderIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-placeholder.svg";
import easyRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-easy-required-solved.svg";
import easyRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-easy-required-tried.svg";
import easyNotRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-easy-solved.svg";
import easyNotRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-easy-tried.svg";
import mediumRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-medium-required-solved.svg";
import mediumRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-medium-required-tried.svg";
import mediumNotRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-medium-solved.svg";
import mediumNotRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-medium-tried.svg";
import hardRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-hard-required-solved-icon.svg";
import hardRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-hard-required-tried.svg";
import hardNotRequiredTriedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-hard-tried.svg";
import hardNotRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-hard-solved-icon.svg";

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
          return easyRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return easyRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return easyNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return easyNotRequiredTriedIcon;
        default:
          return undefined;
      }
    case AdaptivityElementQuestionDifficulty.Medium:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return mediumRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return mediumRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return mediumNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return mediumNotRequiredTriedIcon;
        default:
          return undefined;
      }
    case AdaptivityElementQuestionDifficulty.Hard:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return hardRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return requiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return hardRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return hardNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return notRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredTried:
          return hardNotRequiredTriedIcon;
        default:
          return undefined;
      }
  }
}

function EmptyStarSlot({ className }: { className: string }): JSX.Element {
  return (
    /*<div
      data-testid="empty-star-slot"
      className={tailwindMerge(`${className}`)}
    />*/
    <img
      className={tailwindMerge(`${className}`) + "opacity-60"}
      alt="Platzhalter-Icon"
      src={placeholderIcon}
    />
  );
}

export default function AdaptivityElementDifficultyStars({
  easyState = AdaptivityElementDifficultyStarState.Empty,
  mediumState = AdaptivityElementDifficultyStarState.Empty,
  hardState = AdaptivityElementDifficultyStarState.Empty,
  starClassName,
  withEmptySlots = true,
}: {
  easyState?: AdaptivityElementDifficultyStarState;
  mediumState?: AdaptivityElementDifficultyStarState;
  hardState?: AdaptivityElementDifficultyStarState;
  starClassName: string;
  withEmptySlots?: boolean;
}) {
  return (
    <div className="flex items-center h-full">
      {easyState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Easy, easyState)}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
      {mediumState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Medium, mediumState)}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
      {hardState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Hard, hardState)}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
    </div>
  );
}
