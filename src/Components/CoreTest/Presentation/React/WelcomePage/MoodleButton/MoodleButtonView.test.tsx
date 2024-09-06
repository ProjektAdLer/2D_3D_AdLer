import { fireEvent, render } from "@testing-library/react";
import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import MoodleButton from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonView";
import MoodleButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonViewModel";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

let mockViewModel = new MoodleButtonViewModel();
const windowMock = jest.spyOn(window, "open");

describe("MoodleButton", () => {
  test("should render", () => {
    useBuilderMock([mockViewModel, undefined]);

    render(
      <Provider container={CoreDIContainer}>
        <MoodleButton />
      </Provider>
    );
  });

  test("onClick should work", () => {
    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <MoodleButton />
      </Provider>
    );
    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(windowMock).toHaveBeenCalled();
  });
});
