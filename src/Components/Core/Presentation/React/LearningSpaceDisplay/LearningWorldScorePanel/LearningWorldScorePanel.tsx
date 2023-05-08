import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import LearningWorldScorePanelViewModel from "./LearningWorldScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useEffect, useState } from "react";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ICalculateLearningWorldScoreUseCase from "src/Components/Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import CoreDIContainer from "src/Components/Core/DependencyInjection/CoreDIContainer";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LearningWorldScorePanel({
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  const [viewModel] = useBuilder<LearningWorldScorePanelViewModel, undefined>(
    BUILDER_TYPES.ILearningWorldScorePanelBuilder
  );

  const [score] = useObservable<number>(viewModel?.worldScore);
  const [requiredScore] = useObservable<number>(viewModel?.worldRequiredScore);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage((score / requiredScore) * 100);
  }, [score, requiredScore]);

  const calculateWorldScore =
    CoreDIContainer.get<ICalculateLearningWorldScoreUseCase>(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    );
  useEffect(() => {
    calculateWorldScore.execute();
  }, [calculateWorldScore]);

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
        <img style={{ width: 40, opacity: 0.4 }} src={worldIcon} alt="icon" />

        <div
          className="font-bold text-center"
          style={{ position: "absolute", fontSize: 10, lineHeight: 1.2 }}
        >
          {Math.round(percentage) + "%"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
