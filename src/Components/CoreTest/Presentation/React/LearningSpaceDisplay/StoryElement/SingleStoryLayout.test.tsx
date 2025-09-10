import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import SingleStoryLayout from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/SingleStoryLayout";
import IStoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementController";
import { act } from "react-dom/test-utils";

const controllerMock = mock<IStoryElementController>();

describe("SingleStoryLayout", () => {
  test("should render", () => {
    const componentUnderTest = render(
      <SingleStoryLayout
        contentTexts={[]}
        controller={controllerMock}
        withBackButton={false}
      />,
    );
    expect(componentUnderTest.container).not.toBeEmptyDOMElement();
  });

  test("should call controller.onBackButtonClicked when back button is clicked", () => {
    const componentUnderTest = render(
      <SingleStoryLayout
        contentTexts={[]}
        controller={controllerMock}
        withBackButton={true}
      />,
    );
    fireEvent.click(componentUnderTest.getByTestId("story-back"));
    expect(controllerMock.onBackToSelectionButtonClicked).toHaveBeenCalledTimes(
      1,
    );
  });

  // test("should call controller.closePanel when close button is clicked", () => {
  //   const componentUnderTest = render(
  //     <SingleStoryLayout
  //       contentTexts={[]}
  //       controller={controllerMock}
  //       withBackButton={false}
  //     />
  //   );
  //   fireEvent.click(componentUnderTest.getByTestId("close"));
  //   expect(controllerMock.closePanel).toHaveBeenCalledTimes(1);
  // });

  test("displays text from contentTexts", () => {
    const contentTexts = ["text1"];
    const componentUnderTest = render(
      <SingleStoryLayout
        contentTexts={contentTexts}
        controller={controllerMock}
        withBackButton={false}
      />,
    );
    // Suche nach Text mit Anführungszeichen
    expect(componentUnderTest.getByText('"text1"')).toBeInTheDocument();
  });

  test("displays second text after click an next page button", () => {
    const contentTexts = ["text1", "text2"];
    const componentUnderTest = render(
      <SingleStoryLayout
        contentTexts={contentTexts}
        controller={controllerMock}
        withBackButton={false}
      />,
    );
    // Suche nach Text mit Anführungszeichen
    expect(componentUnderTest.getByText('"text1"')).toBeInTheDocument();

    act(() => {
      fireEvent.click(componentUnderTest.getByTestId("story-next"));
    });

    expect(componentUnderTest.getByText('"text2"')).toBeInTheDocument();
  });

  // Hinweis: Der folgende Test hatte bereits teilweise die korrekten Anführungszeichen,
  // aber der letzte expect-Aufruf war noch falsch.
  test("displays first text after click an back page button", () => {
    const contentTexts = ["text1", "text2"];
    const componentUnderTest = render(
      <SingleStoryLayout
        contentTexts={contentTexts}
        controller={controllerMock}
        withBackButton={false}
      />,
    );
    // Suche nach Text mit Anführungszeichen (war hier schon korrekt)
    expect(componentUnderTest.getByText('"text1"')).toBeInTheDocument();

    act(() => {
      fireEvent.click(componentUnderTest.getByTestId("story-next"));
    });

    // Suche nach Text mit Anführungszeichen (war hier schon korrekt)
    expect(componentUnderTest.getByText('"text2"')).toBeInTheDocument();

    act(() => {
      fireEvent.click(componentUnderTest.getByTestId("story-prev-page"));
    });

    // Suche nach Text mit Anführungszeichen (hier korrigiert)
    expect(componentUnderTest.getByText('"text1"')).toBeInTheDocument();
  });
});
