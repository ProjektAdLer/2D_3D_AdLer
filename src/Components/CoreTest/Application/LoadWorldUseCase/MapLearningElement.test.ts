import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";
import ILearningWorldPort from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementEntity from "../../../Core/Domain/Entities/LearningElementEntity";
import H5PLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import TextLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/TextLearningElementData";
import ImageLeanringElementData from "../../../Core/Domain/Entities/SpecificLearningElements/ImageLearningElementData";
import VideoLearningElementData from "../../../Core/Domain/Entities/SpecificLearningElements/VideoLearningElementData";
import LearningElementTO from "../../../Core/Application/DataTransportObjects/LearningElementTO";
import IBackendAdapter from "../../../Core/Adapters/BackendAdapter/IBackendAdapter";

const backendMock = mock<IBackendAdapter>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const uiPortMock = mock<IUIPort>();

describe("LoadWorldUseCase", () => {
  let systemUnderTest: LoadWorldUseCase;
  let functionUnderTest: (element: LearningElementTO) => LearningElementEntity;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadWorldUseCase);
    functionUnderTest = systemUnderTest["mapLearningElement"];
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  const h5pInput: LearningElementTO = {
    id: 1,
    name: "Test",
    elementType: "h5p",
    value: [
      {
        type: "number",
        value: 1,
      },
    ],
    requirements: [
      {
        type: "number",
        value: 1,
      },
    ],
    metaData: [
      {
        key: "h5pFileName",
        value: "testFileName",
      },
      {
        key: "h5pContextId",
        value: "1337",
      },
    ],
  };

  const h5pExpected: Partial<LearningElementEntity> = {
    id: 1,
    name: "Test",
    value: 1,
    requirement: 1,
    learningElementData: {
      type: "h5p",
      contextId: 1337,
      fileName: "testFileName",
    } as H5PLearningElementData,
  };

  const textInput: LearningElementTO = {
    id: 2,
    name: "TestText",
    elementType: "text",
    value: [
      {
        type: "number",
        value: 1,
      },
    ],
    requirements: [
      {
        type: "number",
        value: 1,
      },
    ],
    metaData: [],
  };

  const imageInput: LearningElementTO = {
    id: 2,
    name: "TestImage",
    elementType: "image",
    value: [
      {
        type: "number",
        value: 1,
      },
    ],
    requirements: [
      {
        type: "number",
        value: 1,
      },
    ],
    metaData: [],
  };

  const videoInput: LearningElementTO = {
    id: 2,
    name: "TestVideo",
    elementType: "video",
    value: [
      {
        type: "number",
        value: 1,
      },
    ],
    requirements: [
      {
        type: "number",
        value: 1,
      },
    ],
    metaData: [],
  };

  const textExpected: Partial<LearningElementEntity> = {
    id: 2,
    name: "TestText",
    value: 1,
    requirement: 1,
    learningElementData: {
      type: "text",
    } as TextLearningElementData,
  };

  const imageExpected: Partial<LearningElementEntity> = {
    id: 2,
    name: "TestImage",
    value: 1,
    requirement: 1,
    learningElementData: {
      type: "image",
    } as ImageLeanringElementData,
  };

  const videoExpected: Partial<LearningElementEntity> = {
    id: 2,
    name: "TestVideo",
    value: 1,
    requirement: 1,
    learningElementData: {
      type: "video",
    } as VideoLearningElementData,
  };

  const inputAndExpected: [
    string,
    APILearningElementTO,
    Partial<LearningElementEntity>
  ][] = [
    ["h5p", h5pInput, h5pExpected],
    ["text", textInput, textExpected],
    ["image", imageInput, imageExpected],
    ["video", videoInput, videoExpected],
  ];

  test.each(inputAndExpected)(
    "Maps Learnign Element to Learning Element Entity for %s",
    (
      _text: string,
      i: LearningElementTO,
      e: Partial<LearningElementEntity>
    ) => {
      functionUnderTest(i);

      expect(entityContainerMock.createEntity).toHaveBeenCalledWith(
        e,
        LearningElementEntity
      );
    }
  );
});
