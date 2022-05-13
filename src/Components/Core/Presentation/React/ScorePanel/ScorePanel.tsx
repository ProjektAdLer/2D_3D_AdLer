import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default function ScorePanel() {
  const [viewModels] = useViewModelControllerProvider<
    ScorePanelViewModel,
    undefined
  >(ScorePanelViewModel);
  const [score] = useObservable<number>(viewModels[0]?.score);

  return (
    <StyledContainer className="bottom-0 left-0 p-13 text-4xl text-white font-extrabold ">
      <img src="icons/coin_icon.svg" className="w-10"></img>
      {score}
    </StyledContainer>
  );
}
