import ElementController from "../../../../Core/Presentation/Babylon/Elements/ElementController";
import ElementView from "../../../../Core/Presentation/Babylon/Elements/ElementView";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";

jest.mock("../../../../../Lib/Observable.ts");
jest.mock("@babylonjs/core");

describe("ElementView", () => {
  test("constructor sets up render callbacks", () => {
    const [viewModel, controller, view] = setup();

    expect(view["controller"]).toBe(controller);
    expect(view["viewModel"]).toBe(viewModel);
    expect(viewModel.elementData.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.position.subscribe).toHaveBeenCalledTimes(1);
    expect(viewModel.rotation.subscribe).toHaveBeenCalledTimes(1);
  });
});

function setup(): [ElementViewModel, ElementController, ElementView] {
  const viewModel = new ElementViewModel();
  const controller = new ElementController(viewModel);
  const view = new ElementView(viewModel, controller);
  return [viewModel, controller, view];
}
