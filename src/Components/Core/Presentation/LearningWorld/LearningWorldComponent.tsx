import React, { useState } from "react";
import useNewPrimitive from "../CustomHooks/useNewPrimitive";
import usePrimitive from "../CustomHooks/usePrimitive";
import StyledButton from "../ReactCommon/StyledButton";
import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

export default function LearningWorldComponent() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  const [test] = useNewPrimitive<string>(viewModel[0]?.test);

  return (
    <React.Fragment>
      <div>{test}</div>
      <StyledButton
        onClick={() => {
          console.log(viewModel[0]?.worldName);
        }}
      >
        Yalla
      </StyledButton>
    </React.Fragment>
  );
}
