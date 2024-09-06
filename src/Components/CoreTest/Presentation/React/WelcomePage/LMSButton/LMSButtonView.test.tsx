import { fireEvent, render } from "@testing-library/react";
import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LMSButton from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonView";
import LMSButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonViewModel";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

let mockViewModel = new LMSButtonViewModel();
const windowMock = jest.spyOn(window, "open");

describe("LMSButton", () => {
  test("should render", () => {
    useBuilderMock([mockViewModel, undefined]);

    render(
      <Provider container={CoreDIContainer}>
        <LMSButton />
      </Provider>
    );
  });

  test("onClick should work", () => {
    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LMSButton />
      </Provider>
    );
    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(windowMock).toHaveBeenCalled();
  });
});
