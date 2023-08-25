import { Vector3 } from "@babylonjs/core";
import LearningElementTO from "../../../../Core/Application/DataTransferObjects/LearningElementTO";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementPresenter";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

jest.mock("@babylonjs/core");

const testElementTO: LearningElementTO = {
  id: 0,
  value: 0,
  parentSpaceID: 0,
  parentWorldID: 0,
  name: "test",
  description: "",
  goals: [""],
  type: "h5p",
  hasScored: false,
  model: LearningElementModelTypeEnums.NoElementModelTypes.None,
};
const testVector = new Vector3(1, 2, 3);

describe("LearningElementPresenter", () => {
  let systemUnderTest: LearningElementPresenter;
  let viewModel: LearningElementViewModel;

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementPresenter(viewModel);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("onLearningElementScored sets is hasScored if the id matches", () => {
    viewModel.id = 42;
    viewModel.hasScored.Value = false;
    systemUnderTest.onLearningElementScored(true, 42);

    expect(systemUnderTest["viewModel"].hasScored.Value).toBe(true);
  });

  test("onElementScored does not set is hasScored if the id does not match", () => {
    viewModel.id = 0;
    viewModel.hasScored.Value = false;
    systemUnderTest.onLearningElementScored(true, 42);

    expect(systemUnderTest["viewModel"].hasScored.Value).toBe(false);
  });
});
