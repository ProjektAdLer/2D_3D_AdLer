import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import MenuHeaderBarController from "./MenuHeaderBarController";
import MenuHeaderBarViewModel from "./MenuHeaderBarViewModel";
import homeIcon from "../../../../../../Assets/icons/22-home-icon/home-icon-nobg.svg";

export default function MenuHeaderBar() {
  const [viewModel, controller] = useBuilder<
    MenuHeaderBarViewModel,
    MenuHeaderBarController
  >(BUILDER_TYPES.IHeaderBarBuilder);

  const [title] = useObservable<string>(viewModel?.title);

  if (!viewModel || !controller) return null;

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <StyledButton className="" onClick={controller.onMenuButtonClicked}>
          <img className="w-10 xl:w-12" src={homeIcon} alt="Home Icon" />
        </StyledButton>{" "}
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
