import useObservable from "../CustomHooks/useObservable";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import ScorePanelViewModel from "./ScorePanelViewModel";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

import coinIcon from "../../../../../Assets/icons/coin_icon.svg";

export default function ScorePanel() {
  const [viewModel] = useBuilder<ScorePanelViewModel, undefined>(
    BUILDER_TYPES.IScorePanelBuilder
  );
  const [score] = useObservable<number>(viewModel?.score);

  return (
    <div className="grid justify-end">
      <StyledContainer className="flex items-center text-lg font-extrabold text-white lg:text-4xl text-shadow">
        {score ? score : 0}
        <img
          src={coinIcon}
          className="xl:w-16 lg:w-10 md:w-8 sm:w-8"
          alt="Coin-Icon"
        ></img>
      </StyledContainer>
    </div>
  );
}
