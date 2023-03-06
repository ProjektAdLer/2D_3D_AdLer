import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import ScorePanelViewModel from "./ScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useEffect, useState } from "react";

import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import { useInjection } from "inversify-react";
import ILoadWorldUseCase from "src/Components/Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  scoreType: "space" | "world";
}

export default function ScorePanel({
  scoreType,
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  // const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
  //   USECASE_TYPES.ILoadWorldUseCase
  // );
  const [viewModel] = useBuilder<ScorePanelViewModel, undefined>(
    BUILDER_TYPES.IScorePanelBuilder
  );
  const [score] = useObservable<number>(
    scoreType === "space" ? viewModel?.spaceScore : viewModel?.worldScore
  );
  const [requiredScore] = useObservable<number>(
    scoreType === "space"
      ? viewModel?.spaceRequiredScore
      : viewModel?.worldRequiredScore
  );
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage((score / requiredScore) * 100);
  }, [score, requiredScore]);

  if (!viewModel) return null;

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
          src={scoreType === "space" ? coinIcon : worldIcon}
          alt="icon"
        />

        <div
          className="font-bold text-center"
          style={{ position: "absolute", fontSize: 10, lineHeight: 1.2 }}
        >
          {score ?? "x"}
          <br /> von <br />
          {requiredScore ?? "y"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
