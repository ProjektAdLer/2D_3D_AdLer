import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import ScorePanelViewModel from "./ScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";

export default function ScorePanel() {
  const [viewModel] = useBuilder<ScorePanelViewModel, undefined>(
    BUILDER_TYPES.IScorePanelBuilder
  );
  const [score] = useObservable<number>(viewModel?.score);
  const [requiredScore] = useObservable<number>(viewModel?.requiredScore);
  const percentage = (score / requiredScore) * 100;

  return (
    <div style={{ width: 60 }}>
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
          style={{ width: 40, opacity: 0.4 }}
          src={coinIcon}
          alt="coin-icon"
        />

        <div
          className="font-bold text-center"
          style={{ position: "absolute", fontSize: 10, lineHeight: 1.2 }}
        >
          {score ?? "0"} <br /> von <br /> {requiredScore ?? "0"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
