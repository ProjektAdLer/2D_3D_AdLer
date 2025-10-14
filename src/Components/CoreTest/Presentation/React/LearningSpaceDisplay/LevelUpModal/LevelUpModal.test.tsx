import { fireEvent, render } from "@testing-library/react";
import LevelUpModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LevelUpModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModal";
import LevelUpModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalController";
import mock from "jest-mock-extended/lib/Mock";
import React from "react";

describe("LevelUpModal", () => {
  let viewModelMock: LevelUpModalViewModel;
  const controllerMock = mock<LevelUpModalController>();

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    // Mock HTMLAudioElement to avoid jsdom errors
    Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });

    viewModelMock = new LevelUpModalViewModel();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  //ANF-ID: [ELG0040]
  test("renders", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const comp = render(<LevelUpModal></LevelUpModal>);
    expect(comp.container).toBeInTheDocument();
  });

  test("returns null when viewModel and controller are not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<LevelUpModal></LevelUpModal>);
    expect(comp.container).toBeEmptyDOMElement();
  });

  test("closes window automatically when model is set to isOpen", () => {
    jest.useFakeTimers();
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    const comp = render(<LevelUpModal></LevelUpModal>);

    jest.advanceTimersByTime(viewModelMock.timeToClose + 1);
    expect(controllerMock.close).toHaveBeenCalled();
  });

  test("closes window if close button is clicked", () => {
    jest.useFakeTimers();
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    const comp = render(<LevelUpModal></LevelUpModal>);
    const button = comp.getByRole("button");
    fireEvent.click(button);
    expect(controllerMock.close).toHaveBeenCalled();
  });

  test("plays sound with delay when modal opens", () => {
    jest.useFakeTimers();
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, "play");

    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    render(<LevelUpModal></LevelUpModal>);

    // Sound should not play immediately
    expect(playSpy).not.toHaveBeenCalled();

    // Advance timer by 1 second (the delay)
    jest.advanceTimersByTime(1000);

    // Now sound should have been played
    expect(playSpy).toHaveBeenCalled();
  });
});
