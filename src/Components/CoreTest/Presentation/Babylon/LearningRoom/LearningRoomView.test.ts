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

  test("createFloorViaCorners throws error if viewModel is not set", () => {
    expect(() => {
      //@ts-ignore
      new LearningRoomView(undefined, roomControllerMock);
    }).toThrowError("ViewModel is not set");
  });

  test("createFloorViaCorners throws error if cornerCount is smaller than 3", () => {
    expect(() => {
      systemUnderTest["viewModel"].roomCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
      ];
    }).toThrowError(
      "Not enough corners found to generate floor. Please review the Roomdata."
    );
  });

  test("change to roomHeight triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].roomHeight.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to roomWidth triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].roomWidth.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to roomLength triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].roomLength.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to wallThickness triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].wallThickness.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to baseHeight triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].baseHeight.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to doorHeight triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].doorHeight.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to doorWidth triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].doorWidth.Value = 20;

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to wallColor triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].wallColor.Value = new Color3(0.25, 0.26, 0.27);

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });

  test("change to roomCornerPoints triggers callback to displayRoom", () => {
    const displayRoomMock = jest.spyOn(systemUnderTest, "displayRoom");

    systemUnderTest["viewModel"].roomCornerPoints.Value = [
      new Vector2(30, 31),
      new Vector2(32, 33),
      new Vector2(34, 35),
    ];

    expect(displayRoomMock).toHaveBeenCalledTimes(1);
  });
});
