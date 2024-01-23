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
  }, [scoreInfo?.currentScore, scoreInfo?.requiredScore, scoreInfo]);
  useEffect(() => {
    const calculateWorldScore =
      CoreDIContainer.get<ICalculateLearningWorldScoreUseCase>(
        USECASE_TYPES.ICalculateLearningWorldScoreUseCase
      );

    calculateWorldScore.execute();
  }, []);

  if (!viewModel) return null;

  return (
    <div className="w-[49px] lg:w-[70px] bg-buttonbgblue rounded-full">
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
          src={worldIcon}
          alt="icon"
        />

        <div className="absolute text-adlerdarkblue text-[8px] lg:text-[10px] xl:[12px] font-bold leading-5 text-center">
          {Math.round(percentage) + "%"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
