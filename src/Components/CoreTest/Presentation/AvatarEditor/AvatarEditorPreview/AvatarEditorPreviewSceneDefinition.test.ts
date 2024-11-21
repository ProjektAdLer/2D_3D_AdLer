import {
  ISceneLoaderAsyncResult,
  Mesh,
  MeshBuilder,
  NullEngine,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import AvatarEditorPreviewSceneDefinition from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewSceneDefinition";
import { mock, mockDeep } from "jest-mock-extended";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import AvatarEditorPreviewModelBuilder from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelBuilder";

jest.mock("@babylonjs/core");
jest.mock("@babylonjs/materials/shadowOnly/shadowOnlyMaterial");

const presentationDirectorMock = mockDeep<IPresentationDirector>();
const previewModelBuilderMock = mock<AvatarEditorPreviewModelBuilder>();

describe("AvatarEditorPreviewSceneDefinition", () => {
  let systemUnderTest: AvatarEditorPreviewSceneDefinition;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(BUILDER_TYPES.IPresentationDirector).toConstantValue(
      presentationDirectorMock,
    );
    CoreDIContainer.rebind(
      BUILDER_TYPES.IAvatarEditorPreviewModelBuilder,
    ).toConstantValue(previewModelBuilderMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(AvatarEditorPreviewSceneDefinition);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("initializeScene works", () => {
    systemUnderTest["scene"] = new Scene(new NullEngine());
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    mockMesh.position = new Vector3(0, 0, 0);
    mockMesh.rotation = new Vector3(0, 0, 0);
    MeshBuilder.CreatePlane = jest.fn().mockReturnValue(mockMesh);
    MeshBuilder.CreateCylinder = jest.fn().mockReturnValue(mockMesh);
    previewModelBuilderMock.getViewModel.mockReturnValue({
      baseModelMeshes: [mockMesh],
    });

    expect(() => {
      systemUnderTest["initializeScene"]();
    }).not.toThrow();
  });
});
