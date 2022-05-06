import React from "react";
import StyledContainer from "../ReactCommon/StyledContainer";
import usePrimitive from "../CustomHooks/usePrimitive";
import LearningWorldComponent from "../LearningWorld/LearningWorldComponent";
import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "../LearningWorld/LearningWorldViewModel";

export default function WorldNamePanel() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [worldName] = usePrimitive<string>(viewModel[0]?.worldName);
  const [worldNameLoading] = usePrimitive<boolean>(
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
