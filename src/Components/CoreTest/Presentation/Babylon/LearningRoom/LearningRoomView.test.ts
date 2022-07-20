import LearningRoomView from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import { Color3, Mesh, StandardMaterial, Vector2 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningRoomController from "../../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";

const roomControllerMock = mock<ILearningRoomController>();
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
    viewModel.floorMesh.Value = true as unknown as Mesh;
    viewModel.floorMaterial.Value = true as unknown as StandardMaterial;
    systemUnderTest = new LearningRoomView(viewModel, roomControllerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  // Tests are currently skipped due to babylon specific code that is being executed in the LearningRoomView Constructor ~ fk
  test("createFloorViaCorners throws error if viewModel is not set", () => {
    expect(() => {
      //@ts-ignore
      new LearningRoomView(undefined, roomControllerMock);
    }).toThrowError("ViewModel is not set");
  });

  test("createFloorViaCorners throws error if cornerCount is smaller than 3", () => {
    expect(() => {
      //@ts-ignore
      systemUnderTest.viewModel.roomCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
      ];
    }).toThrowError(
      "Not enough corners found to generate floor. Please review the Roomdata."
    );
  });
  test("displayRoom is being called", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");
    //@ts-ignore
    systemUnderTest.viewModel.roomHeight.Value = 20;
    expect(displayRoomMock).toHaveBeenCalled();
  });
  test("subscribe Methods in the constructor calls displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest.viewModel.roomHeight.Value = 20;
    systemUnderTest.viewModel.roomWidth.Value = 21;
    systemUnderTest.viewModel.roomLength.Value = 22;
    systemUnderTest.viewModel.wallThickness.Value = 23;
    systemUnderTest.viewModel.baseHeight.Value = 24;
    // these three attributes cannot be tested as of now, as setting them would trigger babylon code ~ fk
    // systemUnderTest.viewModel.wallColor.Value = new Color3(0.25, 0.26, 0.27);
    // systemUnderTest.viewModel.doorHeight.Value = 28;
    // systemUnderTest.viewModel.doorWidth.Value = 29;
    systemUnderTest.viewModel.roomCornerPoints.Value = [
      new Vector2(30, 31),
      new Vector2(32, 33),
      new Vector2(34, 35),
    ];
    expect(displayRoomMock).toHaveBeenCalledTimes(6);
  });

  test.skip("createFloorViaCorners creates a Mesh", () => {
    const mesh = viewModel.floorMesh.Value;
    expect(mesh).toBe(!undefined);
  });
});
