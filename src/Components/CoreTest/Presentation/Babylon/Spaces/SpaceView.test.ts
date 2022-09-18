import SpaceView from "../../../../Core/Presentation/Babylon/Spaces/SpaceView";
import SpaceViewModel from "../../../../Core/Presentation/Babylon/Spaces/SpaceViewModel";
import {
  Color3,
  Mesh,
  NullEngine,
  StandardMaterial,
  Vector2,
} from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ISpaceController from "../../../../Core/Presentation/Babylon/Spaces/ISpaceController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";

const spaceControllerMock = mock<ISpaceController>();
const scenePresenterMock = mock<IScenePresenter>();
const babylonMock = new NullEngine();
describe("SpaceView", () => {
  let systemUnderTest: SpaceView;
  let viewModel: SpaceViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  beforeEach(() => {
    viewModel = new SpaceViewModel();
    viewModel.floorMesh.Value = true as unknown as Mesh;
    viewModel.floorMaterial.Value = true as unknown as StandardMaterial;
    systemUnderTest = new SpaceView(viewModel, spaceControllerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Space View throws error if viewModel is not set", () => {
    expect(() => {
      //@ts-ignore
      new SpaceView(undefined, spaceControllerMock);
    }).toThrowError("ViewModel is not set");
  });

  test("displaySpace throws error if cornerCount is smaller than 3", () => {
    expect(() => {
      systemUnderTest["viewModel"].spaceCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
      ];
    }).toThrowError(
      "Not enough corners found to generate space. Please review the Spacedata."
    );
  });

  test.skip("cleanup Old Walls returns if viewModel.wallMeshes is empty", () => {
    systemUnderTest["viewModel"].wallMeshes.Value = [];
    expect(viewModel.wallMeshes.Value).toBe([]);
  });

  test.skip("cleanup Old Walls removes any wallMeshes in the viewModel", () => {
    // Needs to be checked once more
    systemUnderTest["wallMeshes"] = 1 as unknown as Mesh[];
    expect(viewModel.wallMeshes.Value).toBe(undefined);
  });

  // copy paste for poles and floor

  test.skip("change to spaceHeight triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].spaceHeight.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to spaceWidth triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].spaceWidth.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to spaceLength triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].spaceLength.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to wallThickness triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].wallThickness.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to baseHeight triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].baseHeight.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to doorHeight triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].doorHeight.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to doorWidth triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].doorWidth.Value = 20;

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to wallColor triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].wallColor.Value = new Color3(0.25, 0.26, 0.27);

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });

  test.skip("change to spaceCornerPoints triggers callback to displaySpace", () => {
    const displaySpaceMock = jest.spyOn(systemUnderTest, "displaySpace");

    systemUnderTest["viewModel"].spaceCornerPoints.Value = [
      new Vector2(30, 31),
      new Vector2(32, 33),
      new Vector2(34, 35),
    ];

    expect(displaySpaceMock).toHaveBeenCalledTimes(1);
  });
});
