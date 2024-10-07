import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LMSButton from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonView";
import LMSButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonViewModel";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import LMSButtonController from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonController";
import { render } from "@testing-library/react";

let mockViewModel = new LMSButtonViewModel();

describe("LMSButton", () => {
  // ANF-ID: [EZZ0032]
  test("should render", () => {
    useBuilderMock([mockViewModel, LMSButtonController]);

    render(
      <Provider container={CoreDIContainer}>
        <LMSButton />
      </Provider>,
    );
  });
});
