import React from "react";
import { fireEvent, render } from "@testing-library/react";
import StorySelection from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StorySelection";
import IStoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementController";
import { mock } from "jest-mock-extended";

const controllerMock = mock<IStoryElementController>();

describe("StorySelection", () => {
  test("should render", () => {
    const componenUnderTest = render(
      <StorySelection controller={controllerMock} />
    );
    expect(componenUnderTest.container).not.toBeEmptyDOMElement();
  });

  test("should call controller.onIntroButtonClicked when intro button is clicked", () => {
    const componentUnderTest = render(
      <StorySelection controller={controllerMock} />
    );
    fireEvent.click(componentUnderTest.getByTestId("intro"));
    expect(controllerMock.onIntroButtonClicked).toHaveBeenCalledTimes(1);
  });

  test("should call controller.onOutroButtonClicked when outro button is clicked", () => {
    const { getByTestId } = render(
      <StorySelection controller={controllerMock} />
    );
    fireEvent.click(getByTestId("outro"));
    expect(controllerMock.onOutroButtonClicked).toHaveBeenCalledTimes(1);
  });
});
