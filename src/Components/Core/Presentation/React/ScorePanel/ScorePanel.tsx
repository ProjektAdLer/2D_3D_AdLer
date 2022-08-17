import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import ScorePanelViewModel from "./ScorePanelViewModel";

import coinIcon from "../../../../../Assets/icons/coin_icon.svg";

export default function ScorePanel() {
  const [viewModels] = useViewModelControllerProvider<
    ScorePanelViewModel,
    undefined
  >(ScorePanelViewModel);
  const [score] = useObservable<number>(viewModels[0]?.score);

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
