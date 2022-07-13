import { Vector3 } from "@babylonjs/core";
import { LearningElementTO } from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

jest.mock("@babylonjs/core");

const testElementTO: LearningElementTO = {
  id: 0,
  type: "h5p",
};
const testVector = new Vector3(1, 2, 3);

describe("LearningElementPresenter", () => {
  let presenter: LearningElementPresenter;

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("presentLearningElement calls the babylon engine", () => {
    presenter = new LearningElementPresenter(new LearningElementViewModel());
    presenter.presentLearningElement(testElementTO, [testVector, 0]);

    expect(presenter["viewModel"].id).toBe(testElementTO.id);
    expect(presenter["viewModel"].position.Value).toBe(testVector);
    expect(presenter["viewModel"].rotation.Value).toBe(0);
  });

  test("presentLearningElement throws error when no view model is set", () => {
    presenter = new LearningElementPresenter(null);
    expect(() => {
      presenter.presentLearningElement(testElementTO, [testVector, 0]);
    }).toThrowError();
  });
});
