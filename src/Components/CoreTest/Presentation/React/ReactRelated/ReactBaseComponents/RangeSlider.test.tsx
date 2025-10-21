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
    ).toBeDefined();

    expect(
      componentUnderTest.getByTestId("rightRangeSliderButton"),
    ).toBeDefined();
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

  test("enableInputField set to true enables number inputfield", () => {
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        value={2}
        step={1}
        callback={callbackMock}
        buttons={{}}
        enableInputField={true}
      ></RangeSlider>,
    );
    expect(
      componentUnderTest.getByTestId("rangeInputField_number"),
    ).toBeDefined();
  });

  test("enableInputField set to false disables number inputfield", () => {
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        value={2}
        step={1}
        callback={callbackMock}
        buttons={{}}
        enableInputField={false}
      ></RangeSlider>,
    );
    expect(componentUnderTest.queryByTestId("rangeInputField_number")).toBe(
      null,
    );
  });

  test("display-prop renders text", () => {
    const componentUnderTest = render(
      <RangeSlider
        min={0}
        max={4}
        value={2}
        step={1}
        callback={callbackMock}
        buttons={{}}
        enableInputField={false}
        display={() => {
          return "test-text";
        }}
      ></RangeSlider>,
    );
    expect(componentUnderTest.getByText("test-text")).toBeDefined();
  });

  test("onClick of left buttons calls setInterval", () => {
    const setInterval = jest.spyOn(global, "setInterval");
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

    fireEvent.mouseDown(
      componentUnderTest.getByTestId("leftRangeSliderButton"),
    );
    expect(setInterval).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  test("onClick of left buttons calls setInterval", () => {
    const clearInterval = jest.spyOn(global, "clearInterval");
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

    fireEvent.mouseDown(
      componentUnderTest.getByTestId("leftRangeSliderButton"),
    );
    fireEvent.mouseLeave(
      componentUnderTest.getByTestId("leftRangeSliderButton"),
    );
    expect(clearInterval).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  test("onClick of right buttons calls setInterval", () => {
    const setInterval = jest.spyOn(global, "setInterval");
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

    fireEvent.mouseDown(
      componentUnderTest.getByTestId("rightRangeSliderButton"),
    );
    expect(setInterval).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  test("onChange of slider parses input to number", () => {
    const parse = jest.spyOn(global, "parseFloat");
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

    const slider = componentUnderTest.getByRole("slider");
    fireEvent.change(slider, { target: { value: 2 } });
    expect(parse).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
