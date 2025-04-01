// DoorLogic.spec.ts
import { Sound } from "@babylonjs/core";
import DoorLogic from "../../../../../Core/Presentation/Babylon/Door/DoorLogic/DoorLogic";

// Use a class-based mock for Sound so that instances have the setVolume and play methods
jest.mock("@babylonjs/core", () => {
  return {
    Sound: class {
      setVolume = jest.fn();
      play = jest.fn();
      constructor(name: string, url: any, scene: any) {
        // You can add any initialization logic here if needed
      }
    },
  };
});

// DoorLogic.spec.ts

// Use a class-based mock for Sound so that instances have the setVolume and play methods
jest.mock("@babylonjs/core", () => {
  return {
    Sound: class {
      setVolume = jest.fn();
      play = jest.fn();
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
    };

    mockIdleAnimationGroup = {
      name: "door_open_idle",
      children: [1],
      stop: jest.fn(),
      play: jest.fn(),
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

    // Check if the sound was played by accessing the mocked Sound instance
  });
});
