import { fireEvent, render, waitFor } from "@testing-library/react";
import RangeSlider from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/RangeSlider";
import React from "react";

const callbackMock = jest.fn();

describe("RangeSlider", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("onClick triggers given callback", () => {
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        step={1}
        callback={callbackMock}
      ></RangeSlider>,
    );

    fireEvent.click(componentUnderTest.getByAltText("SliderComponent"));
    expect(callbackMock).toHaveBeenCalled();
  });

  test("onChange calls useState", () => {
    const useStateMock = jest.spyOn(React, "useState");

    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        step={1}
        callback={callbackMock}
      ></RangeSlider>,
    );

    fireEvent.change(componentUnderTest.getByAltText("SliderComponent"), {
      target: { value: 1 },
    });

    expect(useStateMock).toHaveBeenCalled();
  });

  test("renders buttons if buttons are defined", () => {
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        step={1}
        callback={callbackMock}
        buttons={{}}
      ></RangeSlider>,
    );

    expect(
      componentUnderTest.getByTestId("leftRangeSliderButton"),
    ).toBeInTheDocument();

    expect(
      componentUnderTest.getByTestId("rightRangeSliderButton"),
    ).toBeInTheDocument();
  });

  test("onClick of left button calls useState", () => {
    const useStateMock = jest.spyOn(React, "useState");
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        value={2}
        step={1}
        callback={callbackMock}
        buttons={{}}
      ></RangeSlider>,
    );

    fireEvent.click(componentUnderTest.getByTestId("leftRangeSliderButton"));
    expect(useStateMock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  test("onClick of right button calls useState", () => {
    const useStateMock = jest.spyOn(React, "useState");
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        value={2}
        step={1}
        callback={callbackMock}
        buttons={{}}
      ></RangeSlider>,
    );

    fireEvent.click(componentUnderTest.getByTestId("rightRangeSliderButton"));
    expect(useStateMock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
