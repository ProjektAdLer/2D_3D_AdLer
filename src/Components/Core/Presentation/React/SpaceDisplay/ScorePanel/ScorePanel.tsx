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
        strokeWidth={15}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathTransitionDuration: 1.5,

          // Colors
          pathColor: `rgba(39, 117,84, ${percentage / 100})`,
          trailColor: "#C45B01",
        })}
      >
        <RadialSeparators
          count={25}
          style={{
            background: "rgb(69,160,229)",
            width: "1px",
            // This needs to be equal to props.strokeWidth
            height: `${15}%`,
          }}
        />
        <img
          style={{ width: 40, opacity: 0.5 }}
          src={coinIcon}
          alt="coin-icon"
        />

        <div style={{ position: "absolute" }}>
          {(score ?? "0") + "/" + (requiredScore ?? "0")}
        </div>
      </CircularProgressbarWithChildren>
      ;
    </div>
  );
}
