import useObservable from "../../../ReactRelated/CustomHooks/useObservable";
import ExperiencePointsPanelViewModel, {
  XPInfo,
} from "./ExperiencePointsPanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import xpIcon from "../../../../../../../Assets/icons/xp.svg";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";
import Progressbar from "~ReactComponents/ReactRelated/ReactBaseComponents/Progressbar";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  gradingStyle: GradingStyle;
  isButton: boolean;
}

export default function ExperiencePointsPanel({
  ...rest
}: React.DetailedHTMLProps<PanelProps, HTMLDivElement>) {
  const [viewModel] = useBuilder<ExperiencePointsPanelViewModel, undefined>(
    BUILDER_TYPES.IExperiencePointsPanelBuilder,
  );

  const [scoreInfo] = useObservable<XPInfo>(viewModel?.xpInfo);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!scoreInfo) return;
    if (
      scoreInfo.maxLevel === 0 ||
      scoreInfo.currentLevel === scoreInfo.maxLevel
    )
      setPercentage(100);
    else {
      setPercentage(Math.min(Math.round(scoreInfo.currentXP), 100));
    }
  }, [scoreInfo?.currentXP, scoreInfo]);

  if (!viewModel) return null;

  return (
    <Progressbar
      button={rest.isButton}
      value={percentage}
      max={100}
      progressbarText={percentage.toString() + " XP"}
      iconClassName={rest.isButton ? "opacity-40" : ""}
      iconTextClassName="font-bold text-2xl text-center text-yellow-300"
      iconText={scoreInfo?.currentLevel.toString()}
      barClassName="w-20 font-bold text-center text-yellow-300 "
      icon={xpIcon}
    />
  );
}
