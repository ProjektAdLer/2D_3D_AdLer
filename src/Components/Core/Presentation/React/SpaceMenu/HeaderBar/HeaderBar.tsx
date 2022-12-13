import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
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
      <div className="flex items-center justify-between">
        {/* <StyledButton
          disabled
          className=""
          onClick={controller.onMenuButtonClicked}
        >
          <img className="w-10 xl:w-12" src={homeIcon} alt="Home Icon" />
        </StyledButton> */}{" "}
        {/* Auskommentiert, wegen Evaluation */}
        <div></div> {/* Dieser leere <div> hält das Layout zusammen*/}
        <div>
          <StyledContainer
            className="text-xl lg:text-4xl roboto-black text-shadow"
            textColor="white"
          >
            {title}
          </StyledContainer>
        </div>
        <div>
          {/* <StyledButton
          className="col-span-1 col-start-8"
          onClick={controller.onBackButtonClicked}
        >
          Back
        </StyledButton> */}
        </div>
      </div>
    </React.Fragment>
  );
}
