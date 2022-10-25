import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import ScorePanelViewModel from "./ScorePanelViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

import coinIcon from "../../../../../../Assets/icons/coin_icon.svg";

export default function ScorePanel() {
  const [viewModel] = useBuilder<ScorePanelViewModel, undefined>(
    BUILDER_TYPES.IScorePanelBuilder
  );
  const [score] = useObservable<number>(viewModel?.score);
  const [requiredScore] = useObservable<number>(viewModel?.requiredScore);

  return (
    <div className="flex justify-end">
      <StyledContainer
        textColor="white"
        className="flex items-center text-lg roboto-black lg:text-2xl text-shadow"
      >
        {(score ? score : 0) + " / " + (requiredScore ? requiredScore : 0)}
        <img src={coinIcon} className="w-8 lg:w-10" alt="Coin-Icon"></img>
      </StyledContainer>
    </div>
  );
}
