import { Vector3 } from "@babylonjs/core";
import { LearningElementTO } from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

jest.mock("@babylonjs/core");

const testElementTO: LearningElementTO = {
  id: 0,
  name: "test",
  learningElementData: {
    type: "h5p",
  },
};
const testVector = new Vector3(1, 2, 3);

describe("LearningElementPresenter", () => {
  let systemUnderTest: LearningElementPresenter;

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("presentLearningElement calls the babylon engine", () => {
    systemUnderTest = new LearningElementPresenter(
      new LearningElementViewModel()
    );
    systemUnderTest.presentLearningElement(testElementTO, [testVector, 0]);

    expect(systemUnderTest["viewModel"].id).toBe(testElementTO.id);
    expect(systemUnderTest["viewModel"].position.Value).toBe(testVector);
    expect(systemUnderTest["viewModel"].rotation.Value).toBe(0);
  });

  test("presentLearningElement throws error when no view model is set", () => {
    //@ts-ignore
    systemUnderTest = new LearningElementPresenter(null);
    expect(() => {
      systemUnderTest.presentLearningElement(testElementTO, [testVector, 0]);
    }).toThrowError();
  });
});
