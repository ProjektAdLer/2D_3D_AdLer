import tailwindMerge from "../../../Utils/TailwindMerge";

import placeholderIcon from "../../../../../../Assets/icons/diffculties-adaptivity-placeholder.svg";
import easyRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-required-unsolved-icon.svg";
import easyNotRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-unsolved-icon.svg";
import easyRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-required-solved.svg";
import easyRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-required-tried.svg";
import easyNotRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-solved.svg";
import easyNotRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-easy-tried.svg";
import mediumRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-required-unsolved-icon.svg";
import mediumNotRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-unsolved-icon.svg";
import mediumRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-required-solved.svg";
import mediumRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-required-tried.svg";
import mediumNotRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-solved.svg";
import mediumNotRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-tried.svg";
import hardRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-unsolved-icon.svg";
import hardNotRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-unsolved-icon.svg";
import hardRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-solved-icon.svg";
import hardRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-tried.svg";
import hardNotRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-tried.svg";
import hardNotRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-solved-icon.svg";

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

function getIcon(
  difficulty: AdaptivityElementQuestionDifficulty,
  status: AdaptivityElementDifficultyStarState,
): string | undefined {
  switch (difficulty) {
    case AdaptivityElementQuestionDifficulty.Easy:
      switch (status) {
        case AdaptivityElementDifficultyStarState.RequiredSolved:
          return easyRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredUnsolved:
          return easyRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return easyRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return easyNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return easyNotRequiredUnsolvedIcon;
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
          return mediumRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return mediumRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return mediumNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return mediumNotRequiredUnsolvedIcon;
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
          return hardRequiredUnsolvedIcon;
        case AdaptivityElementDifficultyStarState.RequiredTried:
          return hardRequiredTriedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredSolved:
          return hardNotRequiredSolvedIcon;
        case AdaptivityElementDifficultyStarState.NotRequiredUnsolved:
          return hardNotRequiredUnsolvedIcon;
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
      className={tailwindMerge(`${className}`) + " opacity-60"}
      alt="Platzhalter-Icon"
      src={placeholderIcon}
      data-testid={`adaptivity-star-empty`}
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
    <div className="flex h-full items-center">
      {easyState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Easy, easyState)}
          data-testid={`adaptivity-star-easy`}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
      {mediumState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Medium, mediumState)}
          data-testid={`adaptivity-star-medium`}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
      {hardState !== AdaptivityElementDifficultyStarState.Empty ? (
        <img
          className={tailwindMerge(`${starClassName}`)}
          alt=""
          src={getIcon(AdaptivityElementQuestionDifficulty.Hard, hardState)}
          data-testid={`adaptivity-star-hard`}
        />
      ) : (
        withEmptySlots && <EmptyStarSlot className={starClassName} />
      )}
    </div>
  );
}
