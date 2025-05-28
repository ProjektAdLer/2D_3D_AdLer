import useObservable from "../../../ReactRelated/CustomHooks/useObservable";
import LearningSpaceScorePanelViewModel, {
  ScoreInfo,
} from "./LearningSpaceScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

  const { t: translate } = useTranslation("learningSpace");

  useEffect(() => {
    if (!scoreInfo) return;
    setPercentage((scoreInfo.currentScore / scoreInfo.requiredScore) * 100);
  }, [scoreInfo?.currentScore, scoreInfo?.requiredScore, scoreInfo]);

  if (!viewModel) return null;
  return (
    <>
      {rest.gradingStyle === GradingStyle.point && (
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
              src={coinIcon}
              alt="icon"
            />

            <div className="absolute text-adlerdarkblue text-[8px] lg:text-[10px] xl:[12px] font-bold leading-5 text-center">
              {scoreInfo && (
                <div>
                  {translate("spaceScore", {
                    current: scoreInfo.currentScore,
                    required: scoreInfo.requiredScore,
                  })}
                </div>
              )}
            </div>
          </CircularProgressbarWithChildren>
        </div>
      )}
      {rest.gradingStyle === GradingStyle.requirement && (
        <Progressbar
          button={false}
          value={scoreInfo?.currentScore}
          max={scoreInfo?.requiredScore}
          iconText="Text"
          iconClassName="font-bold text-center text-yellow-300"
          barClassName="w-20 font-bold text-center text-yellow-300 "
          icon={coinIcon}
        />
      )}
    </>
  );
}
