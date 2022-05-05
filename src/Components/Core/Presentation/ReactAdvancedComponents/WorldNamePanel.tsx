import React from "react";
import StyledContainer from "../ReactCommon/StyledContainer";

import LearningWorldComponent from "../LearningWorld/LearningWorldComponent";

export default function WorldNamePanel({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <StyledContainer className="inset-x-1/2 p-13 text-4xl text-white p-0 ">
      <LearningWorldComponent />
    </StyledContainer>
  );
}
