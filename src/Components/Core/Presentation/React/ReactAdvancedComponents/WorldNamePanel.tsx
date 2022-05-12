import StyledContainer from "../ReactBaseComponents/StyledContainer";
import useObservable from "../CustomHooks/useObservable";
import LearningWorldComponent from "../../Ports/LearningWorldPort/LearningWorldComponent";
import useViewModelProvider from "../../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "../../Ports/LearningWorldPort/LearningWorldViewModel";

export default function WorldNamePanel() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [worldName] = useObservable<string>(viewModel[0]?.worldName);
  const [worldNameLoading] = useObservable<boolean>(
    viewModel[0]?.worldNameLoading
  );
  return (
    <div className="flex justify-center">
      {(worldNameLoading || worldName) && (
        <StyledContainer className="p-13 text-4xl text-white whitespace-nowrap">
          <LearningWorldComponent
            worldName={worldName}
            worldNameLoading={worldNameLoading}
          />
        </StyledContainer>
      )}
    </div>
  );
}
