import useObservable from "../../../ReactRelated/CustomHooks/useObservable";
import LearningSpaceScorePanelViewModel, {
  ScoreInfo,
} from "./LearningSpaceScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import spaceIcon from "../../../../../../../Assets/icons/space.svg";

import coinIcon from "../../../../../../../Assets/icons/coin.svg";
import LearningSpaceScorePanelController from "./LearningSpaceScorePanelController";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import Progressbar from "~ReactComponents/ReactRelated/ReactBaseComponents/Progressbar";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  gradingStyle: GradingStyle;
}

export default function LearningSpaceScorePanel({
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  const [viewModel] = useBuilder<
    LearningSpaceScorePanelViewModel,
    LearningSpaceScorePanelController
  >(BUILDER_TYPES.ILearningSpaceScorePanelBuilder);

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
    <>
      {rest.gradingStyle === GradingStyle.point && (
        <Progressbar
          button={false}
          value={scoreInfo?.currentScore}
          max={scoreInfo?.requiredScore}
          progressbarText={percentage.toString() + "%"}
          iconClassName="font-bold text-center text-yellow-300"
          barClassName="w-20 font-bold text-center text-yellow-300 "
          icon={coinIcon}
        />
      )}
      {rest.gradingStyle === GradingStyle.requirement && (
        <Progressbar
          button={false}
          value={scoreInfo?.currentScore}
          max={scoreInfo?.requiredScore}
          progressbarText={percentage.toString() + "%"}
          iconClassName="font-bold text-center text-yellow-300"
          barClassName="w-20 font-bold text-center text-yellow-300 "
          icon={spaceIcon}
        />
      )}
    </>
  );
}
