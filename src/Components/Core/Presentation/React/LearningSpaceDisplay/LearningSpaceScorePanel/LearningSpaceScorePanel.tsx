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
    <div style={{ width: 70 }}>
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
        <img style={{ width: 50, opacity: 0.4 }} src={coinIcon} alt="icon" />

        <div
          className="font-bold text-center"
          style={{ position: "absolute", fontSize: 12, lineHeight: 1.2 }}
        >
          {scoreInfo && (
            <div>
              {scoreInfo.currentScore}
              <br /> von <br />
              {scoreInfo.requiredScore}
            </div>
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
