import React from "react";
import useNewPrimitive from "../CustomHooks/useNewPrimitive";
import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

export default function LearningWorldComponent() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [worldName] = useNewPrimitive<string>(viewModel[0]?.worldName);
  const [worldNameLoading] = useNewPrimitive<boolean>(
    viewModel[0]?.worldNameLoading
  );

  return (
    <React.Fragment>
      <div>{worldNameLoading ? "Weltname wird geladen ..." : worldName}</div>
    </React.Fragment>
  );
}
