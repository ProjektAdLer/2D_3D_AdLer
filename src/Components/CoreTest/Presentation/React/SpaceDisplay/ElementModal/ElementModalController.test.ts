import ElementModalController from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalController";
import ScoreElementUseCase from "../../../../../Core/Application/UseCases/ScoreElement/ScoreElementUseCase";

const executeAsyncMock = jest.spyOn(
  ScoreElementUseCase.prototype,
  "executeAsync"
);

describe("ElementModalController", () => {
  let systemUnderTest: ElementModalController;

  beforeEach(() => {
    systemUnderTest = new ElementModalController();
  });

  test("scoreElement calls the ScoreElementUseCase", async () => {
    await systemUnderTest.scoreElement(1);

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      elementId: 1,
    });
  });
});
