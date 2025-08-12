import LearningSpaceView from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceView";
import LearningSpaceViewModel from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceViewModel";
import {
  CSG,
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
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

// mock necessary Babylon objects
jest.mock("@babylonjs/core/Materials");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
scenePresenterMock.Scene.lights = [];

function createSystemUnderTest(): [
  LearningSpaceView,
  ILearningSpaceController,
  LearningSpaceViewModel,
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
  jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockMesh);

  return [mockCSG, mockMesh];
}

describe("LearningSpaceView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  describe("Material Creation Methods", () => {
    //ANF-ID: [ELG0017]
    test("createFloorMaterial creates a material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.theme = ThemeType.Campus;

      systemUnderTest["createFloorMaterial"]();

      expect(viewModel.floorMaterial).toBeInstanceOf(StandardMaterial);
    });

    //ANF-ID: [ELG0017]
    test("createFloorMaterial sets a texture for the floor material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.theme = ThemeType.Campus;

      systemUnderTest["createFloorMaterial"]();

      expect(viewModel.floorMaterial.diffuseTexture).toBeInstanceOf(Texture);
    });

    //ANF-ID: [ELG0017]
    test("createWallMaterial creates a material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.theme = ThemeType.Campus;

      systemUnderTest["createWallMaterial"]();

      expect(viewModel.wallMaterial).toBeInstanceOf(StandardMaterial);
    });

    //ANF-ID: [ELG0017]
    test("createWallMaterial sets a texture for the wall material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.theme = ThemeType.Campus;

      systemUnderTest["createWallMaterial"]();

      expect(viewModel.wallMaterial.diffuseTexture).toBeInstanceOf(Texture);
    });
  });

  describe("asyncSetup Method", () => {
    test("asyncSetup throws error if cornerCount is smaller than 3", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
      ];

      try {
        await systemUnderTest.asyncSetup();
      } catch (e) {
        expect(e).toEqual(
          new Error(
            "Not enough corners found to generate space. Please review the Spacedata.",
          ),
        );
      }
    });

    //ANF-ID: [ELG0017]
    test("asyncSetup calls createFloorMaterial", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      systemUnderTest["createFloorMaterial"] = jest.fn();
      systemUnderTest["createFloor"] = jest.fn();
      systemUnderTest["createWallMaterial"] = jest.fn();
      systemUnderTest["createWalls"] = jest.fn();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["createFloorMaterial"]).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0017]
    test("asyncSetup calls createWallMaterial", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      systemUnderTest["createFloorMaterial"] = jest.fn();
      systemUnderTest["createFloor"] = jest.fn();
      systemUnderTest["createWallMaterial"] = jest.fn();
      systemUnderTest["createWalls"] = jest.fn();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["createWallMaterial"]).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0016]
    test("asyncSetup calls createFloor", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      systemUnderTest["createFloorMaterial"] = jest.fn();
      systemUnderTest["createFloor"] = jest.fn();
      systemUnderTest["createWallMaterial"] = jest.fn();
      systemUnderTest["createWalls"] = jest.fn();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["createFloor"]).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0016]
    test("asyncSetup calls createWalls", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      systemUnderTest["createFloorMaterial"] = jest.fn();
      systemUnderTest["createFloor"] = jest.fn();
      systemUnderTest["createWallMaterial"] = jest.fn();
      systemUnderTest["createWalls"] = jest.fn();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["createWalls"]).toBeCalledTimes(1);
    });
  });

  describe("createFloor method", () => {
    //ANF-ID: [ELG0016]
    test("createFloor creates builds a mesh with the PolyMeshBuilder", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mock<Mesh>());

      await systemUnderTest["createFloor"]();

      expect(PolygonMeshBuilder.prototype.build).toBeCalledTimes(1);
    });

    test("createFloor calls scenePresenter.registerNavigationMesh with the new mesh", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const mockedMesh = mock<Mesh>();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mockedMesh);

      await systemUnderTest["createFloor"]();

      expect(scenePresenterMock.registerNavigationMesh).toBeCalledTimes(1);
      expect(scenePresenterMock.registerNavigationMesh).toBeCalledWith(
        mockedMesh,
      );
    });

    //ANF-ID: [ELG0017]
    test("createFloor applies the floorMaterial to the new mesh", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const mockedMesh = mock<Mesh>();
      jest
        .spyOn(PolygonMeshBuilder.prototype, "build")
        .mockReturnValue(mockedMesh);

      await systemUnderTest["createFloor"]();

      expect(viewModel.floorMesh.material).toStrictEqual(
        viewModel.floorMaterial,
      );
    });
  });

  describe("createWalls method", () => {
    //ANF-ID: [ELG0016]
    test("createWalls creates a merged wall mesh", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments = [
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
      viewModel.windowPositions = [];

      applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mock<Mesh>());

      await systemUnderTest["createWalls"]();

      expect(viewModel.wallMesh).toBeDefined();
    });

    //ANF-ID: [ELG0016]
    test("createWalls calls internal createDoorCutout when exitDoorPosition is set", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();

      viewModel.spaceCornerPoints = viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments = [
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
      viewModel.exitDoorPosition = [new Vector3(0, 0, 0), 0];

      const [, mockedMesh] = applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockedMesh);
      systemUnderTest["createDoorCutout"] = jest
        .fn()
        .mockReturnValue(mockedMesh);

      await systemUnderTest["createWalls"]();

      expect(systemUnderTest["createDoorCutout"]).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0016]
    test("createWalls calls the internal createDoorCutout method when entryDoorPosition is set", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();

      viewModel.spaceCornerPoints = viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments = [
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
      viewModel.entryDoorPosition = [new Vector3(0, 0, 0), 0];

      const [, mockedMesh] = applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockedMesh);
      systemUnderTest["createDoorCutout"] = jest
        .fn()
        .mockReturnValue(mockedMesh);

      await systemUnderTest["createWalls"]();

      expect(systemUnderTest["createDoorCutout"]).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0016]
    test("createWalls calls the internal createWindowCutout method for each windowPosition", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();

      viewModel.spaceCornerPoints = viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments = [
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
      viewModel.windowPositions = [
        [new Vector3(0, 0, 0), 0],
        [new Vector3(0, 0, 0), 0],
      ];

      const [, mockedMesh] = applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockedMesh);
      systemUnderTest["createWindowCutout"] = jest
        .fn()
        .mockReturnValue(mockedMesh);

      await systemUnderTest["createWalls"]();

      expect(systemUnderTest["createWindowCutout"]).toBeCalledTimes(2);
    });

    //ANF-ID: [ELG0017]
    test("createWalls applies the wall material to the new mesh", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegments = [
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
      viewModel.windowPositions = [];

      const [, mockedMesh] = applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockedMesh);

      await systemUnderTest["createWalls"]();

      expect(mockedMesh.material).toStrictEqual(viewModel.wallMaterial);
    });

    test("createWalls calls scenePresenter.registerNavigationMesh with the new mesh", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      viewModel.wallSegmentLocations = [
        {
          index: 0,
          startPoint: { x: 0, z: 0 },
          endPoint: { x: 1, z: 1 },
          angle: 0,
        },
        {
          index: 1,
          startPoint: { x: 1, z: 1 },
          endPoint: { x: 2, z: 2 },
          angle: 0,
        },
        {
          index: 2,
          startPoint: { x: 2, z: 2 },
          endPoint: { x: 0, z: 0 },
          angle: 0,
        },
      ];
      viewModel.wallSegments = [
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
      viewModel.windowPositions = [];

      const [, mockedMesh] = applyWallSegmentCreationMocks();
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockedMesh);

      await systemUnderTest["createWalls"]();

      expect(scenePresenterMock.registerNavigationMesh).toBeCalledTimes(1);
      expect(scenePresenterMock.registerNavigationMesh).toBeCalledWith(
        mockedMesh,
      );
    });

    //ANF-ID: [ELG0016]
    test("createWallSegment returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      //@ts-ignore
      scenePresenterMock.Scene = new Scene(new NullEngine());
      const result = systemUnderTest["createWallSegment"](
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1),
        0,
      );

      expect(result).toBeInstanceOf(Mesh);
    });

    //ANF-ID: [ELG0016]
    test("createAllCornerPoles creates 1 corner pole when there are 2 walls segments with one shared endpoint", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();

      viewModel.cornerPoleLocations = [
        {
          index: 0,
          position: { x: 0, z: 0 },
        },
      ];
      viewModel.wallSegments = [
        {
          start: 0,
          end: 1,
        },
        {
          start: 1,
          end: 2,
        },
      ];
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());

      const result = systemUnderTest["createAllCornerPoles"]();

      expect(result).toHaveLength(1);
    });

    //ANF-ID: [ELG0016]
    test("createCornerPole returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      //@ts-ignore
      scenePresenterMock.Scene = new Scene(new NullEngine());

      const result = systemUnderTest["createCornerPole"](0, 0);

      expect(result).toBeInstanceOf(Mesh);
    });

    //ANF-ID: [ELG0016]
    test("createCornerPole calls MeshBuilder.CreateCylinder", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();
      jest.spyOn(MeshBuilder, "CreateCylinder").mockReturnValue(mock<Mesh>());

      systemUnderTest["createCornerPole"](0, 0);

      expect(MeshBuilder.CreateCylinder).toBeCalledTimes(1);
    });

    //ANF-ID: [ELG0016]
    test("createDoorCutour returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      //@ts-ignore
      scenePresenterMock.Scene = new Scene(new NullEngine());
      const mockCSG = mock<CSG>();
      const mockMesh = new Mesh("mockMesh", scenePresenterMock.Scene);
      mockCSG.subtract.mockReturnValue(mockCSG);
      mockCSG.toMesh.mockReturnValue(mockMesh);
      jest.spyOn(CSG, "FromMesh").mockReturnValue(mockCSG);
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockMesh);
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());

      const result = systemUnderTest["createDoorCutout"](
        [new Vector3(1, 1, 1), 0],
        mockMesh,
      );

      expect(result).toBeInstanceOf(Mesh);
    });

    //ANF-ID: [ELG0016]
    test("createWindowCutout returns a mesh", () => {
      const [systemUnderTest, ,] = createSystemUnderTest();

      //@ts-ignore
      scenePresenterMock.Scene = new Scene(new NullEngine());
      const mockCSG = mock<CSG>();
      const mockMesh = new Mesh("mockMesh", scenePresenterMock.Scene);
      mockCSG.subtract.mockReturnValue(mockCSG);
      mockCSG.toMesh.mockReturnValue(mockMesh);
      jest.spyOn(CSG, "FromMesh").mockReturnValue(mockCSG);
      jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockMesh);
      jest.spyOn(MeshBuilder, "CreateBox").mockReturnValue(mock<Mesh>());

      const result = systemUnderTest["createWindowCutout"](
        [new Vector3(1, 1, 1), 0],
        mockMesh,
      );

      expect(result).toBeInstanceOf(Mesh);
    });
  });
});
