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
    <div className="grid justify-end">
      <StyledContainer className="text-lg lg:text-4xl text-white text-shadow font-extrabold bg-transparent">
        {score ? score : 0}
        <img
          src="icons/coin_icon.svg"
          className="xl:w-16 lg:w-10 md:w-8 sm:w-8"
        ></img>
      </StyledContainer>
    </div>
  );
}
