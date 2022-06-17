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
    <StyledContainer className="top-0 right-0 p-13 text-4xl text-white font-extrabold bg-transparent">
      <img
        src="icons/coin_icon.svg"
        className="xl:w-20 lg:w-16 md:w-10 sm:w-8"
      ></img>
      {score ? score : 0}
    </StyledContainer>
  );
}
