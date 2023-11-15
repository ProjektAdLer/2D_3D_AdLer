import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock } from "jest-mock-extended";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import IExitModalPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/IExitModalPresenter";

const mockBottomTooltipPresenter = mock<IBottomTooltipPresenter>();
const mockExitModalPresenter = mock<IExitModalPresenter>();

describe("DoorPresenter", () => {
  let systemUnderTest: DoorPresenter;
  let viewModel: DoorViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(mockBottomTooltipPresenter);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter
    ).toConstantValue(mockExitModalPresenter);
  });

  beforeEach(() => {
    systemUnderTest = new DoorPresenter(new DoorViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DoorPresenter(undefined);
    }).toThrowError();
  });

  test("openDoor sets state in view model", () => {
    systemUnderTest["viewModel"].isOpen.Value = false;
    systemUnderTest.openDoor();
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
  });

  test("should open door, when winning score is put into the viewmodel", () => {
    systemUnderTest["viewModel"].isExit = true;
    systemUnderTest["viewModel"].spaceID = 1;
    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(1);
  });

  test("should not open door, when winning score is put into the viewModel but id is wrong", () => {
    systemUnderTest["viewModel"].isExit = true;
    systemUnderTest["viewModel"].spaceID = 1;
    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 2,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(0);
  });

  test("should not open door, when door type is not exit", () => {
    systemUnderTest["viewModel"].isExit = false;
    systemUnderTest["viewModel"].spaceID = 1;
    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(0);
  });

  test("should not open door, when currentScore smaller than requiredScore", () => {
    systemUnderTest["viewModel"].isExit = true;
    systemUnderTest["viewModel"].spaceID = 1;
    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 41,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(0);
  });
});
