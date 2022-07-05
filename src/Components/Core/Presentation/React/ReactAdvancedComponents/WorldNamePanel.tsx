import StyledContainer from "../ReactBaseComponents/StyledContainer";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import LearningWorldViewModel from "../../../Ports/LearningWorldPort/LearningWorldViewModel";
import LearningWorldComponent from "../../../Ports/LearningWorldPort/LearningWorldComponent";

import roomIcon from "../../../../../Assets/icons/Lernraum_icon.svg";

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
        <StyledContainer className="p-13 text-xl lg:text-4xl font-extrabold text-white text-shadow whitespace-nowrap">
          <img className="w-8 lg:w-16" src={roomIcon}></img>
          <LearningWorldComponent
            worldName={worldName}
            worldNameLoading={worldNameLoading}
          />
        </StyledContainer>
      )}
    </div>
  );
}
