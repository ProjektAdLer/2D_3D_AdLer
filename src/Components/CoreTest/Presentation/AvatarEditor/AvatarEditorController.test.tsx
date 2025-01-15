import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import AvatarEditorController from "../../../Core/Presentation/AvatarEditor/AvatarEditorController";
import IUpdateAvatarConfigUseCase from "../../../Core/Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import { AvatarHairModels } from "../../../Core/Domain/AvatarModels/AvatarModelTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const updateAvatarConfigUseCaseMock = mock<IUpdateAvatarConfigUseCase>();

describe("AvatarEditorController", () => {
  let systemUnderTest: AvatarEditorController;

  beforeEach(() => {
    systemUnderTest = new AvatarEditorController();
  });
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).toConstantValue(updateAvatarConfigUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onAvatarConfigChanged should call usecase", () => {
    let changes = { hair: "hair-medium-ponytail" as AvatarHairModels };
    systemUnderTest.onAvatarConfigChanged(changes);
    expect(updateAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(updateAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledWith(
      changes,
    );
  });
});
