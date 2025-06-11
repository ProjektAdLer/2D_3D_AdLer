import useObservable from "../../../ReactRelated/CustomHooks/useObservable";
import LearningWorldScorePanelViewModel, {
  ScoreInfo,
} from "./LearningWorldScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import worldIcon from "../../../../../../../Assets/icons/world.svg";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import Progressbar from "~ReactComponents/ReactRelated/ReactBaseComponents/Progressbar";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  gradingStyle: GradingStyle;
}

export default function LearningWorldScorePanel({
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  const [viewModel] = useBuilder<LearningWorldScorePanelViewModel, undefined>(
    BUILDER_TYPES.ILearningWorldScorePanelBuilder,
  );

  const [scoreInfo] = useObservable<ScoreInfo>(viewModel?.scoreInfo);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!scoreInfo) return;
    if (scoreInfo.requiredScore === 0) return setPercentage(100);
    else {
      setPercentage(
        Math.min(
          Math.round((scoreInfo.currentScore / scoreInfo.requiredScore) * 100),
          100,
        ),
      );
    }
  }, [scoreInfo?.currentScore, scoreInfo?.requiredScore, scoreInfo]);

  if (!viewModel) return null;

  return (
    <Progressbar
      button={false}
      value={scoreInfo?.currentScore}
      max={scoreInfo?.requiredScore}
      progressbarText={percentage.toString() + "%"}
      iconClassName="font-bold text-center text-yellow-300"
      barClassName="w-20 font-bold text-center text-yellow-300 "
      icon={worldIcon}
    />
  );
}
