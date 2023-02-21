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
      <div className="flex flex-row place-content-stretch">
        <div className="flex items-center w-1/2 place-content-stretch justify-self-start">
          <StyledButton className="" onClick={controller.onMenuButtonClicked}>
            <img className="w-10 xl:w-12" src={homeIcon} alt="Home Icon" />
          </StyledButton>
        </div>
        <div className="flex justify-center w-full">
          <StyledContainer
            className="text-xl truncate lg:text-4xl roboto-black text-shadow"
            textColor="white"
          >
            {title}
          </StyledContainer>
        </div>
        <div className="flex items-end w-1/2 ">
          <div className="w-20 xl:w-12"></div>
          {/* <MenuTutorial /> WHEN TUTORIAL IS FIXED */}
        </div>
      </div>
    </React.Fragment>
  );
}
