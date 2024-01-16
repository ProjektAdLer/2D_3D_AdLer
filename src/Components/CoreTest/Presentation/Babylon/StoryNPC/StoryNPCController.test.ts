import { mock, mockDeep } from "jest-mock-extended";
import StoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCController";
import StoryNPCViewModel from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import { NullEngine, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";

const characterNavigatorMock = mock<CharacterNavigator>();
const navigationMock = mockDeep<INavigation>();

describe("StoryNPCController", () => {
  let systemUnderTest: StoryNPCController;
  let viewModel: StoryNPCViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    viewModel.characterNavigator = characterNavigatorMock;
    systemUnderTest = new StoryNPCController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test.todo("picked");

  test("setRandomTarget calls startMovement on the characterNavigator with a target", () => {
    navigationMock.Plugin.getRandomPointAround.mockReturnValue(
      new Vector3(2, 0, 2)
    );
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);

    systemUnderTest.setRandomMovementTarget();

    expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
    expect(characterNavigatorMock.startMovement).toBeCalledWith(
      expect.any(Vector3),
      systemUnderTest["startIdleTimeout"]
    );
  });

  test("startIdleTimeout calls setRandomTarget after the idleTime", () => {
    navigationMock.Plugin.getRandomPointAround.mockReturnValue(
      new Vector3(2, 0, 2)
    );
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);

    jest.useFakeTimers();
    const setRandomMovementTargetMock = jest.spyOn(
      systemUnderTest,
      "setRandomMovementTarget"
    );

    systemUnderTest["startIdleTimeout"]();

    expect(setRandomMovementTargetMock).not.toBeCalled();

    jest.advanceTimersByTime(viewModel.idleTime);

    expect(setRandomMovementTargetMock).toBeCalledTimes(1);
  });
});
