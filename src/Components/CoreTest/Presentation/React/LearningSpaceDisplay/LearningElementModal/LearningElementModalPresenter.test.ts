import { ComponentID } from "./../../../../../Core/Domain/Types/EntityTypes";
import LearningElementModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalPresenter";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import LearningElementTO from "../../../../../Core/Application/DataTransferObjects/LearningElementTO";
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import Observable from "../../../../../../Lib/Observable";

describe("LearningElementModalPresenter", () => {
  let systemUnderTest: LearningElementModalPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningElementModalPresenter(
      new LearningElementModalViewModel(),
    );
  });

  test("presentLearningElementModal sets the values in its viewModel", () => {
    const elementTO: LearningElementTO = {
      id: 1,
      name: "Test",
      description: "Test",
      goals: ["Test"],
      type: "h5p",
      value: 1,
      parentSpaceID: 0,
      parentWorldID: 0,
      hasScored: false,
      model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
    };

    systemUnderTest.onLearningElementLoaded(elementTO);

    expect(systemUnderTest["viewModel"].type.Value).toBe(elementTO.type);
    expect(systemUnderTest["viewModel"].id.Value).toBe(elementTO.id);
    expect(systemUnderTest["viewModel"].name.Value).toBe(elementTO.name);
    expect(systemUnderTest["viewModel"].filePath.Value).toBe(
      elementTO.filePath ?? "",
    );
  });

  test("presentLearningElementModal sets the isOpen value to true", () => {
    jest.useFakeTimers();
    const elementTO: LearningElementTO = {
      id: 1,
      name: "Test",
      description: "Test",
      goals: ["Test"],
      type: "h5p",
      value: 1,
      parentSpaceID: 0,
      parentWorldID: 0,
      hasScored: false,
      model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
      isScoreable: true,
    };

    systemUnderTest.onLearningElementLoaded(elementTO);

    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);

    jest.useRealTimers();
  });

  test("presentLearningElementModal sets the isVisible value to true after the openDelay", () => {
    jest.useFakeTimers();
    const elementTO: LearningElementTO = {
      id: 1,
      name: "Test",
      description: "Test",
      goals: ["Test"],
      type: "h5p",
      value: 1,
      parentSpaceID: 0,
      parentWorldID: 0,
      hasScored: false,
      model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
      isScoreable: true,
    };

    systemUnderTest.onLearningElementLoaded(elementTO);
    expect(systemUnderTest["viewModel"].isVisible.Value).toBe(false);
    jest.advanceTimersByTime(systemUnderTest["viewModel"].openDelay + 1);
    expect(systemUnderTest["viewModel"].isVisible.Value).toBe(true);
    jest.useRealTimers();
  });

  test("onLearningElementScored does not set hasScored to corresponding value if id is differenct", () => {
    systemUnderTest["viewModel"].id.Value = 42;
    systemUnderTest["viewModel"].hasScored.Value = false;
    systemUnderTest.onLearningElementScored(true, 1);
    expect(systemUnderTest["viewModel"].hasScored.Value).toEqual(false);
  });

  test("onLearningElementScored sets hasScored to corresponding value", () => {
    systemUnderTest["viewModel"].id.Value = 1;
    systemUnderTest["viewModel"].hasScored.Value = false;
    systemUnderTest.onLearningElementScored(true, 1);
    expect(systemUnderTest["viewModel"].hasScored.Value).toEqual(true);
  });
});
