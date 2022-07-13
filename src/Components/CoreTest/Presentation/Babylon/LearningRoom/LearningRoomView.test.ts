import LearningRoomView from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import { Vector2 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningRoomController from "../../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";

const roomComtrollerMock = mock<ILearningRoomController>();
const scenePresenterMock = mock<IScenePresenter>();

describe("LearningRoomView", () => {
  let systemUnderTest: LearningRoomView;
  let viewModel: LearningRoomViewModel;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  beforeEach(() => {
    viewModel = new LearningRoomViewModel();
    // viewModel.id = 1;
    systemUnderTest = new LearningRoomView(viewModel, roomComtrollerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  // Tests are currently skipped due to babylon specific code that is being executed in the LearningRoomView Constructor ~ fk
  test.skip("createFloorViaCorners throws error if viewModel is not set", () => {
    //@ts-ignore
    viewModel = undefined;
    expect(systemUnderTest).toThrowError("ViewModel not set");
  });

  test.skip("createFloorViaCorners throws error if cornerCount is smaller than 3", () => {
    viewModel.roomCornerPoints.Value = [
      new Vector2(5.3, 4.3),
      new Vector2(-5.3, 4.3),
    ];
    expect(systemUnderTest).toThrowError("Not enough corners");
  });

  test.skip("createFloorViaCorners creates a Mesh", () => {
    const mesh = viewModel.floorMesh.Value;
    expect(mesh).toBe(!undefined);
  });
});
