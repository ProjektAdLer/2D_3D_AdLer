import useObservable from "../../../ReactRelated/CustomHooks/useObservable";
import LearningSpaceScorePanelViewModel, {
  ScoreInfo,
} from "./LearningSpaceScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useState } from "react";
import spaceIcon from "../../../../../../../Assets/icons/space.svg";
import coinIcon from "../../../../../../../Assets/icons/coin.svg";
import LearningSpaceScorePanelController from "./LearningSpaceScorePanelController";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import Progressbar from "~ReactComponents/ReactRelated/ReactBaseComponents/Progressbar";
import { useTranslation } from "react-i18next";

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
  const [icon] = useState<string>(
    rest.gradingStyle === GradingStyle.point ? coinIcon : spaceIcon,
  );
  const { t: translate } = useTranslation("learningSpace");

  if (!viewModel) return null;
  return (
    <Progressbar
      button={false}
      value={scoreInfo?.currentScore}
      max={scoreInfo?.requiredScore}
      progressbarText={translate("spaceScore", {
        current: Math.min(scoreInfo?.currentScore, scoreInfo?.requiredScore),
        required: scoreInfo?.requiredScore,
      }).toString()}
      iconClassName="font-bold text-center text-yellow-300"
      barClassName="w-20 font-bold text-center text-yellow-300 "
      icon={icon}
      tooltip={
        rest.gradingStyle === GradingStyle.point
          ? translate("pointSpaceScoreToolTip").toString()
          : translate("requirementSpaceScoreToolTip").toString()
      }
    />
  );
}
