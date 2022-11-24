import SpaceView from "../../../../Core/Presentation/Babylon/Spaces/SpaceView";
import SpaceViewModel from "../../../../Core/Presentation/Babylon/Spaces/SpaceViewModel";
import {
  Color3,
  Mesh,
  MeshBuilder,
  NullEngine,
  PolygonMeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector2,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ISpaceController from "../../../../Core/Presentation/Babylon/Spaces/ISpaceController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

// mock necessary Babylon objects
jest.mock("@babylonjs/core/Materials");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
scenePresenterMock.Scene.lights = [];

function createSystemUnderTest(): [
  SpaceView,
  ISpaceController,
  SpaceViewModel
] {
  const viewModel = new SpaceViewModel();
  const spaceControllerMock = mock<ISpaceController>();
  const systemUnderTest = new SpaceView(viewModel, spaceControllerMock);
  return [systemUnderTest, spaceControllerMock, viewModel];
}

describe("SpaceView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor adds displayScene to onBeforeRenderObservable on the scene", () => {
    const [systemUnderTest] = createSystemUnderTest();

    expect(
      scenePresenterMock.Scene.onBeforeRenderObservable.add
    ).toBeCalledWith(systemUnderTest.displaySpace);
  });

  describe("Material Creation Methods", () => {
    test("createFloorMaterial creates a material", () => {
      const [, , viewModel] = createSystemUnderTest();

      expect(viewModel.floorMaterial.Value).toBeInstanceOf(StandardMaterial);
    });

    test("createFloorMaterial sets a texture for the floor material", () => {
      const [, , viewModel] = createSystemUnderTest();

      expect(viewModel.floorMaterial.Value.diffuseTexture).toBeInstanceOf(
        Texture
      );
    });

    test("createFloorMaterial sets uv scaling for the floor material's texture", () => {
      const [, , viewModel] = createSystemUnderTest();

      expect(
        (viewModel.floorMaterial.Value.diffuseTexture as Texture).uScale
      ).toBe(2);
      expect(
        (viewModel.floorMaterial.Value.diffuseTexture as Texture).vScale
      ).toBe(2);
    });

    test("createWallMaterial creates a material", () => {
      const [, , viewModel] = createSystemUnderTest();

      expect(viewModel.wallMaterial.Value).toBeInstanceOf(StandardMaterial);
    });
  });

  describe("displaySpace Method", () => {
    test("displaySpace returns if viewModel.isDirty is false", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.isDirty = false;

      systemUnderTest.displaySpace();

      expect(scenePresenterMock.Scene.meshes).toHaveLength(0);
    });

    test("displaySpace throws error if cornerCount is smaller than 3", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
      ];

      expect(() => {
        systemUnderTest.displaySpace();
      }).toThrowError(
        "Not enough corners found to generate space. Please review the Spacedata."
      );
    });

    test("displaySpace resets viewModel.isDirty to false", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
        new Vector2(-5.3, -4.3),
      ];
      viewModel.isDirty = true;
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mock<Mesh>());

      systemUnderTest.displaySpace();

      expect(viewModel.isDirty).toBe(false);
    });
  });

  describe("Cleanup Methods", () => {
    test("cleanupOldWalls sets viewModel.wallMeshes to an empty array when its previously undefined", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      //@ts-ignore
      viewModel.wallMeshes.Value = undefined;

      systemUnderTest["cleanupOldWalls"]();

      expect(viewModel.wallMeshes.Value).toHaveLength(0);
    });

    test("cleanupOldWalls calls dispose on all meshes in viewModel.wallMeshes", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh1 = mock<Mesh>();
      const mockedMesh2 = mock<Mesh>();
      viewModel.wallMeshes.Value = [mockedMesh1, mockedMesh2];

      systemUnderTest["cleanupOldWalls"]();

      expect(mockedMesh1.dispose).toBeCalledTimes(1);
      expect(mockedMesh2.dispose).toBeCalledTimes(1);
    });

    test("cleanupOldWalls sets viewModel.wallMeshes to an empty array when its previously filled with meshes", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.wallMeshes.Value = [mock<Mesh>(), mock<Mesh>()];

      systemUnderTest["cleanupOldWalls"]();

      expect(viewModel.wallMeshes.Value).toHaveLength(0);
    });

    test("cleanupOldPoles sets viewModel.cornerPoleMeshes to an empty array when its previously undefined", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      //@ts-ignore
      viewModel.cornerPoleMeshes.Value = undefined;

      systemUnderTest["cleanupOldPoles"]();

      expect(viewModel.cornerPoleMeshes.Value).toHaveLength(0);
    });

    test("cleanupOldPoles calls dispose on all meshes in viewModel.cornerPoleMeshes", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh1 = mock<Mesh>();
      const mockedMesh2 = mock<Mesh>();
      viewModel.cornerPoleMeshes.Value = [mockedMesh1, mockedMesh2];

      systemUnderTest["cleanupOldPoles"]();

      expect(mockedMesh1.dispose).toBeCalledTimes(1);
      expect(mockedMesh2.dispose).toBeCalledTimes(1);
    });

    test("cleanupOldPoles sets viewModel.cornerPoleMeshes to an empty array when its previously filled with meshes", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.cornerPoleMeshes.Value = [mock<Mesh>(), mock<Mesh>()];

      systemUnderTest["cleanupOldPoles"]();

      expect(viewModel.cornerPoleMeshes.Value).toHaveLength(0);
    });

    test("cleanupOldFloor calls dispose on viewModel.floorMesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      viewModel.floorMesh.Value = mockedMesh;

      systemUnderTest["cleanupOldFloor"]();

      expect(mockedMesh.dispose).toBeCalledTimes(1);
    });
  });

  describe("Creation Methods", () => {
    test("createFloor creates builds a mesh with the PolyMeshBuilder", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mock<Mesh>());

      systemUnderTest["createFloor"]();

      expect(PolygonMeshBuilder.prototype.build).toBeCalledTimes(1);
    });

    test("createFloor calls scenePresenter.registerNavigationMesh with the new mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mockedMesh);

      systemUnderTest["createFloor"]();

      expect(scenePresenterMock.registerNavigationMesh).toBeCalledTimes(1);
      expect(scenePresenterMock.registerNavigationMesh).toBeCalledWith(
        mockedMesh
      );
    });

    test("createFloor applies the floorMaterial to the new mesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mockedMesh);

      systemUnderTest["createFloor"]();

      expect(viewModel.floorMesh.Value.material).toStrictEqual(
        viewModel.floorMaterial.Value
      );
    });

    test("createWalls creates 3 wall meshes when there are 3 corners", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
        new Vector2(-5.3, -4.3),
      ];
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      systemUnderTest["cleanupOldWalls"]();

      systemUnderTest["createWalls"]();

      expect(viewModel.wallMeshes.Value).toHaveLength(3);
    });

    test("createWallSegment returns a mesh", () => {
      //@ts-ignore
      scenePresenterMock.Scene = new Scene(new NullEngine());
      const [systemUnderTest, ,] = createSystemUnderTest();

      const result = systemUnderTest["createWallSegment"](
        new Vector2(0, 0),
        new Vector2(1, 1)
      );

      expect(result).toBeInstanceOf(Mesh);
    });

    test("createWallSegment calls MeshBuilder.CreateBox", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());

      systemUnderTest["createWallSegment"](
        new Vector2(0, 0),
        new Vector2(1, 1)
      );

      expect(MeshBuilder.CreateBox).toBeCalledTimes(1);
    });

    test("createWallSegment calls scenePresenter.registerNavigationMesh with the new mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mockedMesh);

      systemUnderTest["createWallSegment"](
        new Vector2(0, 0),
        new Vector2(1, 1)
      );

      expect(scenePresenterMock.registerNavigationMesh).toBeCalledTimes(1);
      expect(scenePresenterMock.registerNavigationMesh).toBeCalledWith(
        mockedMesh
      );
    });

    test("createWallSegment applies the wall material to the new mesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mockedMesh);

      systemUnderTest["createWallSegment"](
        new Vector2(0, 0),
        new Vector2(1, 1)
      );

      expect(mockedMesh.material).toStrictEqual(viewModel.wallMaterial.Value);
    });

    test.todo("createWallSegment sets position, rotation and length correctly");

    test("applyWallColor applies the color from the viewmodel to the wall texture", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.wallColor.Value = Color3.Red();

      systemUnderTest["applyWallColor"]();

      expect(viewModel.wallMaterial.Value.diffuseColor).toStrictEqual(
        Color3.Red()
      );
    });

    test("createCornerPoles creates 3 corner pole meshes when there are 3 corners", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
        new Vector2(-5.3, -4.3),
      ];
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      systemUnderTest["cleanupOldPoles"]();

      systemUnderTest["createCornerPoles"]();

      expect(viewModel.cornerPoleMeshes.Value).toHaveLength(3);
    });

    test("createPole returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      const result = systemUnderTest["createPole"](new Vector2(0, 0));

      expect(result).toBeInstanceOf(Mesh);
    });

    test("createPole calls MeshBuilder.CreateCylinder", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());

      systemUnderTest["createPole"](new Vector2(0, 0));

      expect(MeshBuilder.CreateCylinder).toBeCalledTimes(1);
    });

    test("createPole applies the wall material to the new mesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mockedMesh);

      systemUnderTest["createPole"](new Vector2(0, 0));

      expect(mockedMesh.material).toStrictEqual(viewModel.wallMaterial.Value);
    });

    test("createPole sets position correctly", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.baseHeight.Value = 2;

      let result = systemUnderTest["createPole"](new Vector2(1, 3));

      expect(result.position).toStrictEqual(new Vector3(1, 2, 3));
    });
  });
});
