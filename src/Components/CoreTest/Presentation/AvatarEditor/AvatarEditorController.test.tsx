import { mock, mockReset } from "jest-mock-extended";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import AvatarEditorController from "../../../Core/Presentation/AvatarEditor/AvatarEditorController";
import IUpdateAvatarConfigUseCase from "../../../Core/Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import { AvatarHairModels } from "../../../Core/Domain/AvatarModels/AvatarModelTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import AvatarEditorViewModel from "../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import ISaveAvatarConfigUseCase from "../../../Core/Application/UseCases/SaveAvatarConfig/ISaveAvatarConfigUseCase";
import ILoadAvatarConfigUseCase from "../../../Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import IRandomizeAvatarConfigUseCase from "../../../Core/Application/UseCases/RandomizeAvatarConfig/IRandomizeAvatarConfigUseCase";

const updateAvatarConfigUseCaseMock = mock<IUpdateAvatarConfigUseCase>();
const saveAvatarConfigUseCaseMock = mock<ISaveAvatarConfigUseCase>();
const loadAvatarConfigUseCaseMock = mock<ILoadAvatarConfigUseCase>();
const randomizeAvatarConfigUseCaseMock = mock<IRandomizeAvatarConfigUseCase>();
const avatarEditorViewModelMock = mock<AvatarEditorViewModel>({
  hasChanged: { Value: false }, // Initialwert für den Mock
});

describe("AvatarEditorController", () => {
  let systemUnderTest: AvatarEditorController;

  beforeEach(() => {
    mockReset(updateAvatarConfigUseCaseMock);
    mockReset(saveAvatarConfigUseCaseMock);
    mockReset(loadAvatarConfigUseCaseMock);
    mockReset(randomizeAvatarConfigUseCaseMock);
    // Reset des ViewModel-Mocks, um sicherzustellen, dass 'hasChanged.Value' für jeden Test frisch ist
    avatarEditorViewModelMock.hasChanged = { Value: false };
    systemUnderTest = new AvatarEditorController(avatarEditorViewModelMock);
  });
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).toConstantValue(updateAvatarConfigUseCaseMock);
    CoreDIContainer.bind<ISaveAvatarConfigUseCase>(
      USECASE_TYPES.ISaveAvatarConfigUseCase,
    ).toConstantValue(saveAvatarConfigUseCaseMock);
    CoreDIContainer.bind<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).toConstantValue(loadAvatarConfigUseCaseMock);
    CoreDIContainer.bind<IRandomizeAvatarConfigUseCase>(
      USECASE_TYPES.IRandomizeAvatarConfigUseCase,
    ).toConstantValue(randomizeAvatarConfigUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onAvatarConfigChanged should call usecase and set hasChanged to true", () => {
    let changes = { hair: "hair-medium-ponytail" as AvatarHairModels };
    systemUnderTest.onAvatarConfigChanged(changes);
    expect(updateAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(updateAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledWith(
      changes,
    );
    expect(avatarEditorViewModelMock.hasChanged.Value).toBe(true);
  });

  test("saveAvatarConfig should call usecase and set hasChanged to false", () => {
    systemUnderTest.saveAvatarConfig();
    expect(saveAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(avatarEditorViewModelMock.hasChanged.Value).toBe(false);
  });

  test("resetAvatarConfig should call usecase and set hasChanged to true", () => {
    systemUnderTest.resetAvatarConfig();
    expect(loadAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(avatarEditorViewModelMock.hasChanged.Value).toBe(true);
  });

  test("randomizeAvatarConfig should call usecase and set hasChanged to true", () => {
    systemUnderTest.randomizeAvatarConfig();
    expect(randomizeAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(
      1,
    );
    expect(avatarEditorViewModelMock.hasChanged.Value).toBe(true);
  });
});
