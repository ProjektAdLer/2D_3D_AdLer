import { Vector3 } from "@babylonjs/core";
import ElementTO from "../../../../Core/Application/DataTransferObjects/ElementTO";
import ElementPresenter from "../../../../Core/Presentation/Babylon/Elements/ElementPresenter";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";

jest.mock("@babylonjs/core");

const testElementTO: ElementTO = {
  id: 0,
  value: 0,
  parentSpaceID: 0,
  parentCourseID: 0,
  name: "test",
  description: "",
  goals: "",
  type: "h5p",
  hasScored: false,
};
const testVector = new Vector3(1, 2, 3);

describe("ElementPresenter", () => {
  let systemUnderTest: ElementPresenter;
  let viewModel: ElementViewModel;

  beforeEach(() => {
    viewModel = new ElementViewModel();
    systemUnderTest = new ElementPresenter(viewModel);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("onElementScored sets is hasScored if the id matches", () => {
    viewModel.id = 42;
    viewModel.hasScored.Value = false;
    systemUnderTest.onElementScored(true, 42);

    expect(systemUnderTest["viewModel"].hasScored.Value).toBe(true);
  });

  test("onElementScored does not set is hasScored if the id does not match", () => {
    viewModel.id = 0;
    viewModel.hasScored.Value = false;
    systemUnderTest.onElementScored(true, 42);

    expect(systemUnderTest["viewModel"].hasScored.Value).toBe(false);
  });

  test("presentElement calls the babylon engine", () => {
    systemUnderTest.presentElement(testElementTO, [testVector, 0]);

    expect(systemUnderTest["viewModel"].id).toBe(testElementTO.id);
    expect(systemUnderTest["viewModel"].position.Value).toBe(testVector);
    expect(systemUnderTest["viewModel"].rotation.Value).toBe(0);
  });
});
