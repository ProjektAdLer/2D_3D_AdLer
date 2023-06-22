import { NullEngine, Scene } from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import ILoadAvatarUseCase from "../../../../../Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import ILoadLearningSpaceUseCase from "../../../../../Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import BUILDER_TYPES from "../../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import INavigation from "../../../../../Core/Presentation/Babylon/Navigation/INavigation";
import LearningSpaceSceneDefinition from "../../../../../Core/Presentation/Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import ILearningSpacePresenter from "../../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpacePresenter";
import IPresentationBuilder from "../../../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import AvatarCameraViewModel from "../../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { waitFor } from "@testing-library/react";

const presentationDirectorMock = mock<IPresentationDirector>();
const presentationBuilderMock = mock<IPresentationBuilder>();
const navigationMock = mock<INavigation>();
const loadSpaceUseCaseMock = mock<ILoadLearningSpaceUseCase>();
const loadAvatarUseCaseMock = mock<ILoadAvatarUseCase>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

const getUserLocationUseCaseReturnValue = {
  spaceID: 1,
  worldID: 1,
};

describe("LearningSpaceScene", () => {
  let systemUnderTest: LearningSpaceSceneDefinition;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(BUILDER_TYPES.IPresentationDirector).toConstantValue(
      presentationDirectorMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.ILearningSpaceBuilder).toConstantValue(
      presentationBuilderMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IAvatarBuilder).toConstantValue(
      presentationBuilderMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IAvatarCameraBuilder).toConstantValue(
      presentationBuilderMock
    );
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    ).toConstantValue(loadSpaceUseCaseMock);
    CoreDIContainer.rebind(USECASE_TYPES.ILoadAvatarUseCase).toConstantValue(
      loadAvatarUseCaseMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(LearningSpaceSceneDefinition);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("initializeScene doesn't throw", () => {
    systemUnderTest["scene"] = new Scene(new NullEngine());
    presentationBuilderMock.getPresenter.mockReturnValue(
      mock<ILearningSpacePresenter>()
    );
    presentationBuilderMock.getViewModel.mockReturnValue(
      new AvatarCameraViewModel()
    );
    getUserLocationUseCaseMock.execute.mockReturnValue(
      getUserLocationUseCaseReturnValue
    );

    expect(
      async () => await systemUnderTest["initializeScene"]()
    ).not.toThrow();
  });

  test("preTasks calls the LoadSpace use case", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue(
      getUserLocationUseCaseReturnValue
    );

    for (const task of systemUnderTest["preTasks"]) {
      await task();
    }

    expect(loadSpaceUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("preTasks contains call to loadAvatarUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue(
      getUserLocationUseCaseReturnValue
    );

    for (const task of systemUnderTest["preTasks"]) {
      await task();
    }

    expect(loadAvatarUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("onLearningSpaceLoaded sets the private menber spaceData", () => {
    const spaceData = mockDeep<ILearningSpacePresenter>();
    systemUnderTest["onLearningSpaceLoaded"](spaceData);

    expect(systemUnderTest["spaceData"]).toBe(spaceData);
  });
});
