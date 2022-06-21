import StyledContainer from "../ReactBaseComponents/StyledContainer";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import LearningWorldViewModel from "../../../Ports/LearningWorldPort/LearningWorldViewModel";
import LearningWorldComponent from "../../../Ports/LearningWorldPort/LearningWorldComponent";

export default function WorldNamePanel() {
  const [viewModel] = useViewModelControllerProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [worldName] = useObservable<string>(viewModel[0]?.worldName);
  const [worldNameLoading] = useObservable<boolean>(
    viewModel[0]?.worldNameLoading
  );
  return (
    <div className="flex justify-center">
      {(worldNameLoading || worldName) && (
        <StyledContainer className="fixed flex p-13 text-4xl roboto-black text-white text-shadow whitespace-nowrap">
          <img className="w-10" src="icons/lernraum-icon.svg"></img>
          <LearningWorldComponent
            worldName={worldName}
            worldNameLoading={worldNameLoading}
          />
        </StyledContainer>
      )}
    </div>
  );
}
