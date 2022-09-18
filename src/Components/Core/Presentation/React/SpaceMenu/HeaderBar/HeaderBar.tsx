import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import HeaderBarController from "./HeaderBarController";
import HeaderBarViewModel from "./HeaderBarViewModel";
import { useNavigate } from "react-router-dom";

export default function HeaderBar() {
  const navigate = useNavigate();
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
          className=""
          onClick={() => navigate("/space")}
          // onClick={controller.onMenuButtonClicked}
        >
          Menu
        </StyledButton>
        <div>
          <StyledContainer className="text-shadow" textColor="white">
            {title}
          </StyledContainer>
        </div>
        <StyledButton
          className="col-span-1 col-start-8"
          onClick={() => navigate(-1)}
          // onClick={controller.onBackButtonClicked}
        >
          Back
        </StyledButton>
      </div>
    </React.Fragment>
  );
}
