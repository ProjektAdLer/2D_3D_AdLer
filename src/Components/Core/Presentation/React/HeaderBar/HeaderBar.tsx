import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactBaseComponents/StyledContainer";
import HeaderBarController from "./HeaderBarController";
import HeaderBarViewModel from "./HeaderBarViewModel";

export default function HeaderBar() {
  const [viewModel, controller] = useBuilder<
    HeaderBarViewModel,
    HeaderBarController
  >(BUILDER_TYPES.IHeaderBarBuilder);

  const [title] = useObservable<string>(viewModel?.title);

  if (!viewModel || !controller) return null;

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <StyledButton
          className="col-span-1 col-start-1"
          onClick={controller.onMenuButtonClicked}
        >
          Menu
        </StyledButton>
        <StyledContainer className="text-4xl grow">{title}</StyledContainer>
        <StyledButton
          className="col-span-1 col-start-8"
          onClick={controller.onBackButtonClicked}
        >
          Back
        </StyledButton>
      </div>
    </React.Fragment>
  );
}
