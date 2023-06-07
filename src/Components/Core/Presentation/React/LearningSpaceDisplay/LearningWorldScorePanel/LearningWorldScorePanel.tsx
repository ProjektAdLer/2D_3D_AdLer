import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import LearningWorldScorePanelViewModel, {
  ScoreInfo,
} from "./LearningWorldScorePanelViewModel";
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

  const [scoreInfo] = useObservable<ScoreInfo>(viewModel?.scoreInfo);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!scoreInfo) return;
    setPercentage((scoreInfo.currentScore / scoreInfo.requiredScore) * 100);
  }, [scoreInfo?.currentScore, scoreInfo?.requiredScore]);
  useEffect(() => {
    const calculateWorldScore =
      CoreDIContainer.get<ICalculateLearningWorldScoreUseCase>(
        USECASE_TYPES.ICalculateLearningWorldScoreUseCase
      );

    calculateWorldScore.execute();
  }, []);

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
        <img style={{ width: 50, opacity: 0.4 }} src={worldIcon} alt="icon" />

        <div
          className="font-bold text-center"
          style={{ position: "absolute", fontSize: 12, lineHeight: 1.2 }}
        >
          {Math.round(percentage) + "%"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
