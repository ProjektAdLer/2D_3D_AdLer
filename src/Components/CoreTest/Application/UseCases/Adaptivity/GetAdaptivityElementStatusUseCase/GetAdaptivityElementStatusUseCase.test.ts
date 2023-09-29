import IGetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import GetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/GetAdaptivityElementStatusUseCase";
import AdaptivityElementProgressTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";

describe("GetAdaptivityElementStatusUseCase", () => {
  let systemUnderTest: IGetAdaptivityElementStatusUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      GetAdaptivityElementStatusUseCase
    );
  });

  test("should get adaptivity status", async () => {
    let progressTO = {
      elementName: "abc",
      shuffleTask: false,
      introText: "",
      tasks: [{ isCompleted: null, questions: [{ isCompleted: null }] }],
      isCompleted: false,
    } as AdaptivityElementProgressTO;
    const result = await systemUnderTest.internalExecuteAsync(progressTO);
    expect(result).toEqual(progressTO);
  });
});
