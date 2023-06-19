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
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";

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
  jest.spyOn(Mesh, "MergeMeshes").mockReturnValue(mockMesh);

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

  describe("Material Creation Methods", () => {
    test("createFloorMaterial creates a material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;

      systemUnderTest["createFloorMaterial"]();

      expect(viewModel.floorMaterial.Value).toBeInstanceOf(StandardMaterial);
    });

    test("createFloorMaterial sets a texture for the floor material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;

      systemUnderTest["createFloorMaterial"]();

      expect(viewModel.floorMaterial.Value.diffuseTexture).toBeInstanceOf(
        Texture
      );
    });

    test("createWallMaterial creates a material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;

      systemUnderTest["createWallMaterial"]();

      expect(viewModel.wallMaterial.Value).toBeInstanceOf(StandardMaterial);
    });

    test("createWallMaterial sets a texture for the wall material", () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;

      systemUnderTest["createWallMaterial"]();

      expect(viewModel.wallMaterial.Value.diffuseTexture).toBeInstanceOf(
        Texture
      );
    });
  });

  describe("asyncSetup Method", () => {
    test("asyncSetup throws error if cornerCount is smaller than 3", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
      ];

      try {
        await systemUnderTest.asyncSetup();
      } catch (e) {
        expect(e).toEqual(
          new Error(
            "Not enough corners found to generate space. Please review the Spacedata."
          )
        );
      }
    });

    test.skip("asyncSetup calls createFloorMaterial", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const createFloorMaterialMockSpy = jest.spyOn(
        systemUnderTest,
        "createFloorMaterial"
      );

      await systemUnderTest.asyncSetup();

      expect(createFloorMaterialMockSpy).toBeCalledTimes(1);
    });

    test.skip("asyncSetup calls createWallMaterial", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const createWallMaterialMockSpy = jest.spyOn(
        systemUnderTest,
        "createWallMaterial"
      );

      await systemUnderTest.asyncSetup();

      expect(createWallMaterialMockSpy).toBeCalledTimes(1);
    });

    test.skip("asyncSetup calls createFloor", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
        new Vector3(5.3, 0, 4.3),
        new Vector3(-5.3, 0, 4.3),
        new Vector3(-5.3, 0, -4.3),
      ];
      const createFloorMockSpy = jest.spyOn(systemUnderTest, "createFloor");

      await systemUnderTest.asyncSetup();

      expect(createFloorMockSpy).toBeCalledTimes(1);
    });
  });

  describe("Creation Methods", () => {
    test("createFloor creates builds a mesh with the PolyMeshBuilder", async () => {
      const [systemUnderTest, , viewModel] = createSystemUnderTest();
      viewModel.spaceCornerPoints.Value = [
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
      viewModel.spaceCornerPoints.Value = [
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
        mockedMesh
      );
    });

    test("createFloor applies the floorMaterial to the new mesh", async () => {
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

      await systemUnderTest["createFloor"]();

      expect(viewModel.floorMesh.Value.material).toStrictEqual(
        viewModel.floorMaterial.Value
      );
    });

    test.skip("createWalls creates 3 wall meshes when there are 3 corners with corresponding wallSegments", async () => {
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

      await systemUnderTest["createWalls"]();

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

    test.skip("createCornerPoles creates 3 corner pole meshes when there are 3 corners with coresponding wallSegements", () => {
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

      expect(result.position).toStrictEqual(new Vector3(1.15, 3.425, 3.15));
    });
  });
});
