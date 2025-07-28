import { AnimationGroup, Scene, NullEngine } from "@babylonjs/core";
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

  beforeEach(() => {
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

  test("should enable proximity behavior when isExit and isOpen are set for exit doors", () => {
    // Simulate an exit door that is already open
    viewModel.isExit = true;
    viewModel.isOpen = { Value: true };
    const elevatorLogic = new ElevatorLogic(viewModel);
    // Clear any previous calls for a fresh check
    elevatorLiftUpAnimation.play.mockClear();
    elevatorLogic.avatarFar();
    expect(elevatorLiftUpAnimation.speedRatio).toBe(-1);
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
  });

  test("open() should start the lift-up animation and register an onAnimationEnd callback", () => {
    const elevatorLogic = new ElevatorLogic(viewModel);
    elevatorLogic.open();
    expect(elevatorLiftUpAnimation.play).toHaveBeenCalledWith(false);
    expect(
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce,
    ).toHaveBeenCalled();

    // Simulate the end of the animation by manually calling the registered callback
    const callback =
      elevatorLiftUpAnimation.onAnimationEndObservable.addOnce.mock.calls[0][0];
    callback();
    // After the animation ends, the internal state elevatorIsLifted should be set to true.
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
});
