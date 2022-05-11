import { Engine, Scene } from "@babylonjs/core";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementController";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagment/SceneViewModel";

jest.mock("../../../../../Lib/Observable.ts");
jest.mock("@babylonjs/core");

describe("LearningElementView", () => {
  test("constructor sets up render callbacks", () => {
    const controller = new LearningElementController();
    const viewModel = new LearningElementViewModel();
    const view = new LearningElementView(viewModel, controller);

    expect(view["controller"]).toBe(controller);
    expect(view["viewModel"]).toBe(viewModel);
    expect(viewModel.type.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.position.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.rotation.subscribe).toHaveBeenCalledTimes(1);
  });
});
