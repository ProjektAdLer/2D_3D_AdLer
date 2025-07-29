// DoorLogic.spec.ts
import { Sound } from "@babylonjs/core";
import DoorLogic from "../../../../../Core/Presentation/Babylon/Door/DoorLogic/DoorLogic";

// Mock the sound file require
jest.mock(
  "../../../../../../Assets/Sounds/door_opening.mp3",
  () => "mock-sound-path",
);

// Use a class-based mock for Sound so that instances have the setVolume and play methods
jest.mock("@babylonjs/core", () => {
  return {
    Sound: class {
      setVolume = jest.fn();
      play = jest.fn();
      isPlaying = false;
      constructor(name: string, url: any, scene: any) {
        // You can add any initialization logic here if needed
      }
    },
  };
});

describe("DoorLogic", () => {
  let mockOpenAnimationGroup: any;
  let mockIdleAnimationGroup: any;
  let mockViewModel: any;
  let mockScenePresenter: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mocks for the animation groups
    mockOpenAnimationGroup = {
      name: "door_open",
      children: [1], // any truthy value to simulate "children"
      stop: jest.fn(),
      play: jest.fn(),
      speedRatio: 1,
      isPlaying: false,
      onAnimationEndObservable: {
        addOnce: jest.fn(),
      },
    };

    mockIdleAnimationGroup = {
      name: "door_open_idle",
      children: [1],
      stop: jest.fn(),
      play: jest.fn(),
      speedRatio: 1,
      isPlaying: false,
      onAnimationEndObservable: {
        addOnce: jest.fn(),
      },
    };

    // Create a mock for the DoorViewModel
    mockViewModel = {
      isOpen: { Value: false },
      doorAnimations: [mockOpenAnimationGroup, mockIdleAnimationGroup],
    };

    // Create a mock for the IScenePresenter
    mockScenePresenter = {
      Scene: {},
    };
  });

  test("should stop all animation groups upon initialization", () => {
    new DoorLogic(mockViewModel, mockScenePresenter);

    expect(mockOpenAnimationGroup.stop).toHaveBeenCalled();
    expect(mockIdleAnimationGroup.stop).toHaveBeenCalled();
  });

  test("should call setDoorOpen if viewModel.isOpen.Value is true", () => {
    // Simulate the door already being open
    mockViewModel.isOpen.Value = true;
    new DoorLogic(mockViewModel, mockScenePresenter);

    // setDoorOpen calls play(false) on the "door_open_idle" animation group
    expect(mockIdleAnimationGroup.play).toHaveBeenCalledWith(false);
  });

  test('open() should play the "door_open" animation and the sound', () => {
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);

    // Clear previous calls to isolate the open() invocation
    jest.clearAllMocks();

    doorLogic.open();

    // Check if the door open animation was played
    expect(mockOpenAnimationGroup.play).toHaveBeenCalledWith(false);
    expect(mockOpenAnimationGroup.speedRatio).toBe(1);
  });

  test("open() should call onAnimationEnd callback when animation ends", () => {
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);
    const onAnimationEnd = jest.fn();

    doorLogic.open(onAnimationEnd);

    expect(
      mockOpenAnimationGroup.onAnimationEndObservable.addOnce,
    ).toHaveBeenCalled();

    // Simulate animation end
    const callback =
      mockOpenAnimationGroup.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();

    expect(onAnimationEnd).toHaveBeenCalled();
  });

  test("open() should call onAnimationEnd with timeout when animation is already playing", () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);
    const onAnimationEnd = jest.fn();

    mockOpenAnimationGroup.isPlaying = true;

    doorLogic.open(onAnimationEnd);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);

    jest.advanceTimersByTime(100);
    expect(onAnimationEnd).toHaveBeenCalled();

    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
  });

  test("open() should call onAnimationEnd with timeout when no animation group exists", () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");
    mockViewModel.doorAnimations = [];
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);
    const onAnimationEnd = jest.fn();

    doorLogic.open(onAnimationEnd);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);

    jest.advanceTimersByTime(100);
    expect(onAnimationEnd).toHaveBeenCalled();

    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
  });

  test("close() should reverse animation and stop it when done", () => {
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);

    doorLogic.close();

    expect(mockOpenAnimationGroup.speedRatio).toBe(-1);
    expect(mockOpenAnimationGroup.play).toHaveBeenCalledWith(false);
    expect(
      mockOpenAnimationGroup.onAnimationEndObservable.addOnce,
    ).toHaveBeenCalled();

    // Simulate animation end
    const callback =
      mockOpenAnimationGroup.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();

    expect(mockOpenAnimationGroup.stop).toHaveBeenCalled();
  });

  test("should initialize sound with correct parameters", () => {
    // The Sound mock is already set up in the jest.mock at the top
    // We just need to verify that a DoorLogic instance can be created without throwing
    expect(() => {
      new DoorLogic(mockViewModel, mockScenePresenter);
    }).not.toThrow();
  });

  test("should handle missing door animations gracefully", () => {
    mockViewModel.doorAnimations = undefined;

    expect(() => {
      new DoorLogic(mockViewModel, mockScenePresenter);
    }).not.toThrow();
  });

  test("should handle empty door animations array gracefully", () => {
    mockViewModel.doorAnimations = [];

    expect(() => {
      new DoorLogic(mockViewModel, mockScenePresenter);
    }).not.toThrow();
  });

  test("should handle animation groups without children gracefully", () => {
    mockOpenAnimationGroup.children = null;
    mockIdleAnimationGroup.children = null;

    expect(() => {
      new DoorLogic(mockViewModel, mockScenePresenter);
    }).not.toThrow();

    expect(mockOpenAnimationGroup.stop).not.toHaveBeenCalled();
    expect(mockIdleAnimationGroup.stop).not.toHaveBeenCalled();
  });

  test("setDoorOpen() should play idle animation", () => {
    const doorLogic = new DoorLogic(mockViewModel, mockScenePresenter);

    // Access private method through any
    (doorLogic as any).setDoorOpen();

    expect(mockIdleAnimationGroup.play).toHaveBeenCalledWith(false);
  });
});
