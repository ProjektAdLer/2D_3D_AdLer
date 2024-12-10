import mock from "jest-mock-extended/lib/Mock";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LoadAvatarConfigUseCase from "../../../../Core/Application/UseCases/LoadAvatarConfig/LoadAvatarConfigUseCase";

const mockLogger = mock<Logger>();
describe("LoadAvatarUseCase", () => {
  let systemUnderTest: LoadAvatarConfigUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<Logger>(CORE_TYPES.ILogger).toConstantValue(
      mockLogger,
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    );
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("resolves", async () => {
    await systemUnderTest.executeAsync();
  });
});
