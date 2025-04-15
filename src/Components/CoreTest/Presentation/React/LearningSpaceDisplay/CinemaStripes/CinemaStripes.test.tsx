import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import CinemaStripes from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripes";
import CinemaStripesViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripesViewModel";
import CinemaStripesController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripesController";
import { mock } from "jest-mock-extended";

let viewModel = new CinemaStripesViewModel();
let fakeController = mock<CinemaStripesController>();
describe("CinemaStripes", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([viewModel, undefined]);
    const { container } = render(<CinemaStripes />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<CinemaStripes />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render if isOpen is set to false", () => {
    viewModel.isOpen.Value = false;
    useBuilderMock([viewModel, fakeController]);
    const { container } = render(<CinemaStripes />);
    expect(container.firstChild).toBeNull();
  });

  test("renders if isOpen is set to true", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);
    const { container } = render(<CinemaStripes />);
    expect(container.childElementCount).toBe(1);
    expect(container).toMatchSnapshot();
  });
});
