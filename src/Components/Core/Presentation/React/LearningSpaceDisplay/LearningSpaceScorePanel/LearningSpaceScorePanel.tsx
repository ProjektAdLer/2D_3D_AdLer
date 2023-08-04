import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import LearningSpaceScorePanelViewModel, {
  ScoreInfo,
} from "./LearningSpaceScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useEffect, useState } from "react";

import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LearningSpaceScorePanel({
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  const [viewModel] = useBuilder<LearningSpaceScorePanelViewModel, undefined>(
    BUILDER_TYPES.ILearningSpaceScorePanelBuilder
  );

  const [scoreInfo] = useObservable<ScoreInfo>(viewModel?.scoreInfo);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!scoreInfo) return;
    setPercentage((scoreInfo.currentScore / scoreInfo.requiredScore) * 100);
  }, [scoreInfo?.currentScore, scoreInfo?.requiredScore, scoreInfo]);

  if (!viewModel) return null;

  return (
    <div className="w-[49px] lg:w-[70px]">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathTransitionDuration: 1.5,

          // Colors
          trailColor: "#E64B17",
          pathColor: `#59B347`,
        })}
      >
        <img
          className="w-[35px] lg:w-[50px] opacity-40"
          src={coinIcon}
          alt="icon"
        />

        <div className="absolute text-[10px] text-white lg:text-adlerdarkblue lg:text-[12px] font-bold leading-5 text-center">
          {scoreInfo && (
            <div>
              {scoreInfo.currentScore} von {scoreInfo.requiredScore}
            </div>
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
