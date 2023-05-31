import LearningSpaceView from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceView";
import LearningSpaceViewModel from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceViewModel";
import {
  CSG,
  Color3,
  Mesh,
  MeshBuilder,
  NullEngine,
  PolygonMeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningSpaceController from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpaceController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

// mock necessary Babylon objects
jest.mock("@babylonjs/core/Materials");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
scenePresenterMock.Scene.lights = [];

function createSystemUnderTest(): [
  LearningSpaceView,
  ILearningSpaceController,
  LearningSpaceViewModel
] {
  const viewModel = new LearningSpaceViewModel();
  const spaceControllerMock = mock<ILearningSpaceController>();
  const systemUnderTest = new LearningSpaceView(viewModel, spaceControllerMock);
  return [systemUnderTest, spaceControllerMock, viewModel];
}

function applyWallSegmentCreationMocks(): [CSG, Mesh] {
  const mockCSG = mock<CSG>();
  const mockMesh = mock<Mesh>();
  mockCSG.subtract.mockReturnValue(mockCSG);
  mockCSG.toMesh.mockReturnValue(mockMesh);
  jest.spyOn(CSG, "FromMesh").mockReturnValue(mockCSG);

  return [mockCSG, mockMesh];
}

describe("LearningSpaceView", () => {
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
    ).toBeCalledWith(systemUnderTest.displayLearningSpace);
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

      systemUnderTest.displayLearningSpace();

      expect(scenePresenterMock.Scene.meshes).toHaveLength(0);
    });

    test("displayLearningSpace throws error if cornerCount is smaller than 3", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
      ];

      expect(() => {
        systemUnderTest.displayLearningSpace();
      }).toThrowError(
        "Not enough corners found to generate space. Please review the Spacedata."
      );
    });

    test("displayLearningSpace resets viewModel.isDirty to false", () => {
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mock<Mesh>());
      applyWallSegmentCreationMocks();

      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments.Value = [
        {
          start: 0,
          end: 1,
        },
      ];
      viewModel.isDirty = true;

      systemUnderTest.displayLearningSpace();

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
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mock<Mesh>());

      systemUnderTest["createFloor"]();

      expect(PolygonMeshBuilder.prototype.build).toBeCalledTimes(1);
    });

    test("createFloor calls scenePresenter.registerNavigationMesh with the new mesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
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
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const mockedMesh = mock<Mesh>();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mockedMesh);

      systemUnderTest["createFloor"]();

      expect(viewModel.floorMesh.Value.material).toStrictEqual(
        viewModel.floorMaterial.Value
      );
    });

    test("createWalls creates 3 wall meshes when there are 3 corners with corresponding wallSegments", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments.Value = [
        {
          start: 0,
          end: 1,
        },
        {
          start: 1,
          end: 2,
        },
        {
          start: 2,
          end: 0,
        },
      ];

      applyWallSegmentCreationMocks();
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
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1)
      );

      expect(result).toBeInstanceOf(Mesh);
    });

    test.skip("createWallSegment calls scenePresenter.registerNavigationMesh with the new mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      applyWallSegmentCreationMocks();
      const mockedMesh = mock<Mesh>();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mockedMesh);

      systemUnderTest["createWallSegment"](
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1)
      );

      expect(scenePresenterMock.registerNavigationMesh).toBeCalledTimes(1);
      expect(scenePresenterMock.registerNavigationMesh).toBeCalledWith(
        mockedMesh
      );
    });

    test.skip("createWallSegment applies the wall material to the new mesh", () => {
      const [, mockedMesh] = applyWallSegmentCreationMocks();
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mockedMesh);

      systemUnderTest["createWallSegment"](
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1)
      );

      expect(mockedMesh.material).toStrictEqual(viewModel.wallMaterial.Value);
    });

    test("applyWallColor applies the color from the viewmodel to the wall texture", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.wallColor.Value = Color3.Red();

      systemUnderTest["applyWallColor"]();

      expect(viewModel.wallMaterial.Value.diffuseColor).toStrictEqual(
        Color3.Red()
      );
    });

    test("createCornerPoles creates 3 corner pole meshes when there are 3 corners with coresponding wallSegements", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments.Value = [
        {
          start: 0,
          end: 1,
        },
        {
          start: 1,
          end: 2,
        },
        {
          start: 2,
          end: 0,
        },
      ];
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      systemUnderTest["cleanupOldPoles"]();

      systemUnderTest["createCornerPoles"]();

      expect(viewModel.cornerPoleMeshes.Value).toHaveLength(3);
    });

    test("createPole returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      const result = systemUnderTest["createPole"](new Vector3(0, 0, 0));

      expect(result).toBeInstanceOf(Mesh);
    });

    test("createPole calls MeshBuilder.CreateCylinder", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());

      systemUnderTest["createPole"](new Vector3(0, 0, 0));

      expect(MeshBuilder.CreateCylinder).toBeCalledTimes(1);
    });

    test("createPole applies the wall material to the new mesh", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      const mockedMesh = mock<Mesh>();
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mockedMesh);

      systemUnderTest["createPole"](new Vector3(0, 0, 0));

      expect(mockedMesh.material).toStrictEqual(viewModel.wallMaterial.Value);
    });

    test("createPole sets position correctly", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.baseHeight.Value = 2;
      viewModel.wallGroundworkDepth.Value = 0;

      let result = systemUnderTest["createPole"](new Vector3(1, 0, 3));

      expect(result.position).toStrictEqual(new Vector3(1, 3.425, 3));
    });
  });
});
