import { NullEngine, Scene } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";
import ILoadAvatarUseCase from "../../../../../Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import ILoadSpaceUseCase from "../../../../../Core/Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import BUILDER_TYPES from "../../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "../../../../../Core/Ports/SpacePort/ISpaceAdapter";
import INavigation from "../../../../../Core/Presentation/Babylon/Navigation/INavigation";
import SpaceSceneDefinition from "../../../../../Core/Presentation/Babylon/SceneManagement/Scenes/SpaceSceneDefinition";
import ISpacePresenter from "../../../../../Core/Presentation/Babylon/Spaces/ISpacePresenter";
import IPresentationBuilder from "../../../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import history from "history/browser";

jest.mock("@babylonjs/core");

const presentationDirectorMock = mock<IPresentationDirector>();
const presentationBuilderMock = mock<IPresentationBuilder>();
const navigationMock = mock<INavigation>();
const spacePortMock = mock<AbstractPort<ISpaceAdapter>>();
const loadSpaceUseCaseMock = mock<ILoadSpaceUseCase>();
const loadAvatarUseCaseMock = mock<ILoadAvatarUseCase>();

describe("SpaceScene", () => {
  let systemUnderTest: SpaceSceneDefinition;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(BUILDER_TYPES.IPresentationDirector).toConstantValue(
      presentationDirectorMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.ISpaceBuilder).toConstantValue(
      presentationBuilderMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IAvatarBuilder).toConstantValue(
      presentationBuilderMock
    );
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.ILoadSpaceUseCase).toConstantValue(
      loadSpaceUseCaseMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.ILoadAvatarUseCase).toConstantValue(
      loadAvatarUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(SpaceSceneDefinition);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("initializeScene doesn't throw", () => {
    systemUnderTest["scene"] = new Scene(new NullEngine());
    presentationBuilderMock.getPresenter.mockReturnValue(
      mock<ISpacePresenter>()
    );

    expect(
      async () => await systemUnderTest["initializeScene"]()
    ).not.toThrow();
  });

  test("initializeScene calls presentSpace on the space presenter", async () => {
    systemUnderTest["scene"] = new Scene(new NullEngine());
    const presenterMock = mock<ISpacePresenter>();
    presentationBuilderMock.getPresenter.mockReturnValue(presenterMock);
    const spaceTO: SpaceTO = {
      id: 0,
      name: "",
      elements: [],
      description: "",
      goals: "",
      requirements: [],
      requiredPoints: 0,
    };
    systemUnderTest["spaceTO"] = spaceTO;

    await systemUnderTest["initializeScene"]();

    expect(presenterMock.onSpaceDataLoaded).toHaveBeenCalledWith(spaceTO);
  });

  test("preTasks contains call to loadSpaceUseCase", async () => {
    await systemUnderTest["preTasks"].forEach((task) => task());

    expect(loadSpaceUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("preTasks contains call to loadAvatarUseCase", async () => {
    await systemUnderTest["preTasks"].forEach((task) => task());

    expect(loadAvatarUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("parseSpaceIdFromLocation returns the correct space id", () => {
    // TODO: make this more robust, to reflect changes in the url structure in production code
    history.push("/space/1");

    const spaceId = systemUnderTest["parseSpaceIdFromLocation"]();

    expect(spaceId).toBe(1);
  });
});
