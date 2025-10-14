import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import LearningWorldCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalController";
import LearningWorldCompletionModal from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const controllerMock = mock<LearningWorldCompletionModalController>();

describe("LearningWorldCompletionModalView", () => {
  //ANF-ID: [EWE0028]
  test("should render when openend", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const container = render(<LearningWorldCompletionModal />);

    expect(container.getByText("Lernwelt abgeschlossen!")).toBeInTheDocument();
  });

  test("should not render when not openend", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = false;
    useBuilderMock([vm, undefined]);

    const container = render(<LearningWorldCompletionModal />);

    expect(
      container.queryByText("Du hast alle Lernräume erfolgreich"),
    ).not.toBeInTheDocument();
  });

  //ANF-ID: [EWE0028]
  test("should call controller when clicked", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const component = render(<LearningWorldCompletionModal />);
    fireEvent.click(component.getByRole("button"));

    expect(controllerMock.CloseButtonClicked).toHaveBeenCalled();
  });

  test("should play sound when modal is opened", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    vm.isOtherModalOpen.Value = false;
    useBuilderMock([vm, controllerMock]);

    // Mock Audio
    const mockPlay = jest.fn().mockResolvedValue(undefined);
    global.Audio = jest.fn().mockImplementation(() => ({
      play: mockPlay,
      volume: 0.5,
    })) as any;

    render(<LearningWorldCompletionModal />);

    expect(mockPlay).toHaveBeenCalled();
  });

  test("should not play sound when other modal is open", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    vm.isOtherModalOpen.Value = true;
    useBuilderMock([vm, controllerMock]);

    // Mock Audio
    const mockPlay = jest.fn().mockResolvedValue(undefined);
    global.Audio = jest.fn().mockImplementation(() => ({
      play: mockPlay,
      volume: 0.5,
    })) as any;

    render(<LearningWorldCompletionModal />);

    expect(mockPlay).not.toHaveBeenCalled();
  });

  test("should initialize audio with volume 0.5", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = false;
    useBuilderMock([vm, controllerMock]);

    let capturedVolume: number | undefined;
    global.Audio = jest.fn().mockImplementation(() => {
      const audio = {
        play: jest.fn().mockResolvedValue(undefined),
        volume: 0,
      };
      Object.defineProperty(audio, "volume", {
        get: () => capturedVolume,
        set: (v) => {
          capturedVolume = v;
        },
      });
      return audio;
    }) as any;

    render(<LearningWorldCompletionModal />);

    expect(capturedVolume).toBe(0.5);
  });
});
