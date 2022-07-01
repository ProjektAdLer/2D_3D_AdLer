import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementController";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

jest.mock("../../../../../Lib/Observable.ts");
jest.mock("@babylonjs/core");

describe("LearningElementView", () => {
  test("constructor sets up render callbacks", () => {
    const [viewModel, controller, view] = setup();

    expect(view["controller"]).toBe(controller);
    expect(view["viewModel"]).toBe(viewModel);
    expect(viewModel.learningElementData.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.position.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.rotation.subscribe).toHaveBeenCalledTimes(1);
  });
});

function setup(): [
  LearningElementViewModel,
  LearningElementController,
  LearningElementView
] {
  const viewModel = new LearningElementViewModel();
  const controller = new LearningElementController(viewModel);
  const view = new LearningElementView(viewModel, controller);
  return [viewModel, controller, view];
}
