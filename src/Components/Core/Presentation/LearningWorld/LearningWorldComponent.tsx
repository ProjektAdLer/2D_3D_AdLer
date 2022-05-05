import React from "react";
import usePrimitive from "../CustomHooks/usePrimitive";
import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

export default function LearningWorldComponent() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [worldName] = usePrimitive<string>(viewModel[0]?.worldName);
  const [worldNameLoading] = usePrimitive<boolean>(
    viewModel[0]?.worldNameLoading
  );

  return (
    <React.Fragment>
      <div>{worldNameLoading ? "Weltname wird geladen ..." : worldName}</div>
    </React.Fragment>
  );
}
