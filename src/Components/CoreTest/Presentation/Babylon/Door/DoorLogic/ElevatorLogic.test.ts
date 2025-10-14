import { AnimationGroup } from "@babylonjs/core";
import DoorViewModel from "../../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import ElevatorLogic from "../../../../../Core/Presentation/Babylon/Door/DoorLogic/ElevatorLogic";

// Create a mock for BabylonJS AnimationGroup
const createMockAnimationGroup = (name: string) => ({
  name,
  children: [{}], // Dummy value to ensure truthy
  stop: jest.fn(),
  play: jest.fn(),
  start: jest.fn(),
  speedRatio: 0,
  isPlaying: false,
  onAnimationEndObservable: {
    add: jest.fn(),
    addOnce: jest.fn(),
    clear: jest.fn(),
  },
});

describe("ElevatorLogic", () => {
  let viewModel: any;
  let elevatorOpenAnimation: any;
  let elevatorLiftUpAnimation: any;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    // Mock HTMLAudioElement to avoid jsdom errors - needs to be in beforeEach to apply to each new Audio instance
    Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });

    // Create mocks for the two animations used in ElevatorLogic
    elevatorOpenAnimation = createMockAnimationGroup("elevator_open");
    elevatorLiftUpAnimation = createMockAnimationGroup(
      "elevator_drive_up_open",
    );

    // Create a mock for the DoorViewModel with the necessary properties
    viewModel = {
      doorAnimations: [elevatorOpenAnimation, elevatorLiftUpAnimation],
      isExit: false, // Simulate an entry door
      isOpen: { Value: false },
    };
  });

  test("should play 'elevator_open' animation on initialization for non-exit doors", () => {
    new ElevatorLogic(viewModel);
    expect(elevatorOpenAnimation.play).toHaveBeenCalledWith(false);
    // For an entry door, the elevator open animation is played during initialization.
  });

  test("should stop all animations with children on initialization", () => {
    new ElevatorLogic(viewModel);
    expect(elevatorOpenAnimation.stop).toHaveBeenCalled();
    expect(elevatorLiftUpAnimation.stop).toHaveBeenCalled();
  });

  test("should not stop animations without children", () => {
    elevatorOpenAnimation.children = null;
    elevatorLiftUpAnimation.children = null;

    new ElevatorLogic(viewModel);

    expect(elevatorOpenAnimation.stop).not.toHaveBeenCalled();
    expect(elevatorLiftUpAnimation.stop).not.toHaveBeenCalled();
  });

  test("should enable proximity behavior for exit elevators that are open", () => {
    viewModel.isExit = true;
    viewModel.isOpen = { Value: true };

    const elevatorLogic = new ElevatorLogic(viewModel);

    // Clear any previous calls for a fresh check
    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarFar();
    expect(elevatorLiftUpAnimation.speedRatio).toBe(-1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
  });

  test("should not enable proximity behavior for exit elevators that are not open", () => {
    viewModel.isExit = true;
    viewModel.isOpen = { Value: false };

    const elevatorLogic = new ElevatorLogic(viewModel);

    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarFar();
    expect(elevatorLiftUpAnimation.play).not.toHaveBeenCalled();
  });

  test("open() should start the lift-up animation and register an onAnimationEnd callback", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);
    const onAnimationEnd = jest.fn();

    elevatorLogic.open(onAnimationEnd);

    expect(elevatorLiftUpAnimation.speedRatio).toBe(1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
    expect(
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce,
    ).toHaveBeenCalled();

    // Simulate the end of the animation by manually calling the registered callback
    const callback =
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();

    expect(onAnimationEnd).toHaveBeenCalled();
  });

  test("open() should play sound when animation ends", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);
    const playSpy = jest.spyOn(elevatorLogic["elevatorUpSound"], "play");

    elevatorLogic.open();

    // Simulate the end of the animation by manually calling the registered callback
    const callback =
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();

    expect(playSpy).toHaveBeenCalled();
  });

  test("open() should work without onAnimationEnd callback", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);

    expect(() => {
      elevatorLogic.open();
    }).not.toThrow();

    expect(elevatorLiftUpAnimation.speedRatio).toBe(1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
  });

  test("close() should reverse the lift animation and stop it when done", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);

    elevatorLogic.close();

    expect(elevatorLiftUpAnimation.speedRatio).toBe(-1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
    expect(
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce,
    ).toHaveBeenCalled();

    // Simulate animation end
    const callback =
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();

    expect(elevatorLiftUpAnimation.stop).toHaveBeenCalled();
  });

  test("avatarClose() should play the animation with speedRatio 1 if elevator is not lifted", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);
    // Simulate that the elevator is not lifted by calling avatarFar first
    elevatorLogic.avatarFar();
    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarClose();
    expect(elevatorLiftUpAnimation.speedRatio).toBe(1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
  });

  test("avatarClose() should not play animation if proximity behavior is disabled", () => {
    viewModel.isExit = true;
    viewModel.isOpen = { Value: false }; // This disables proximity behavior

    const elevatorLogic = new ElevatorLogic(viewModel);
    elevatorLiftUpAnimation.play.mockClear();

    elevatorLogic.avatarClose();

    expect(elevatorLiftUpAnimation.play).not.toHaveBeenCalled();
  });

  test("avatarClose() should not play animation if elevator is already lifted", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);

    // First lift the elevator
    elevatorLogic.open();
    const callback =
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback(); // This sets elevatorIsLifted to true

    elevatorLiftUpAnimation.play.mockClear();

    elevatorLogic.avatarClose();

    expect(elevatorLiftUpAnimation.play).not.toHaveBeenCalled();
  });

  test("avatarFar() should play the animation with speedRatio -1 and reset elevatorIsLifted", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);
    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarFar();
    expect(elevatorLiftUpAnimation.speedRatio).toBe(-1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);

    // Since elevatorIsLifted is a private state, we verify behavior indirectly by calling avatarClose
    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarClose();
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
  });

  test("avatarFar() should not play animation if proximity behavior is disabled", () => {
    viewModel.isExit = true;
    viewModel.isOpen = { Value: false }; // This disables proximity behavior

    const elevatorLogic = new ElevatorLogic(viewModel);
    elevatorLiftUpAnimation.play.mockClear();

    elevatorLogic.avatarFar();

    expect(elevatorLiftUpAnimation.play).not.toHaveBeenCalled();
  });

  test("should handle missing animations gracefully", () => {
    viewModel.doorAnimations = [];

    expect(() => {
      new ElevatorLogic(viewModel);
    }).not.toThrow();
  });

  test("should handle undefined doorAnimations gracefully", () => {
    viewModel.doorAnimations = undefined;

    expect(() => {
      new ElevatorLogic(viewModel);
    }).not.toThrow();
  });

  test("should handle open() when elevatorAnimationLiftUp is undefined", () => {
    viewModel.doorAnimations = [elevatorOpenAnimation]; // Only one animation

    const elevatorLogic = new ElevatorLogic(viewModel);

    expect(() => {
      elevatorLogic.open();
    }).not.toThrow();
  });

  test("should handle close() when elevatorAnimationLiftUp is undefined", () => {
    viewModel.doorAnimations = [elevatorOpenAnimation]; // Only one animation

    const elevatorLogic = new ElevatorLogic(viewModel);

    expect(() => {
      elevatorLogic.close();
    }).not.toThrow();
  });

  test("should handle avatarClose() when elevatorAnimationLiftUp is undefined", () => {
    viewModel.doorAnimations = [elevatorOpenAnimation]; // Only one animation

    const elevatorLogic = new ElevatorLogic(viewModel);

    expect(() => {
      elevatorLogic.avatarClose();
    }).not.toThrow();
  });

  test("should handle avatarFar() when elevatorAnimationLiftUp is undefined", () => {
    viewModel.doorAnimations = [elevatorOpenAnimation]; // Only one animation

    const elevatorLogic = new ElevatorLogic(viewModel);

    // This should throw because the implementation tries to set speedRatio on undefined
    expect(() => {
      elevatorLogic.avatarFar();
    }).toThrow();
  });

  test("should set initial state correctly for entry elevator", () => {
    viewModel.isExit = false;

    new ElevatorLogic(viewModel);

    // For entry elevators, the initial elevator animation should play
    expect(elevatorOpenAnimation.play).toHaveBeenCalledWith(false);
  });

  test("should not play initial animation for exit elevator", () => {
    viewModel.isExit = true;
    viewModel.isOpen = { Value: false };

    new ElevatorLogic(viewModel);

    // For exit elevators that aren't open, no initial animation should play
    expect(elevatorOpenAnimation.play).not.toHaveBeenCalled();
  });
});
