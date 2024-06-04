import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementPresenter";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import { Vector3 } from "@babylonjs/core";

describe("LearningElementPresenter", () => {
  let systemUnderTest: LearningElementPresenter;
  let viewModel: LearningElementViewModel;

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementPresenter(viewModel);
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

  test("onLearningElementHighlighted sets isHighlighted if the id matches", () => {
    viewModel.id = 42;
    viewModel.isHighlighted.Value = false;
    systemUnderTest.onLearningElementHighlighted(42);

    expect(systemUnderTest["viewModel"].isHighlighted.Value).toBe(true);
  });

  test("onLearningElementHighlighted sets isHighlighted to false after the timeout", () => {
    jest.useFakeTimers();
    viewModel.id = 42;
    viewModel.isHighlighted.Value = false;
    systemUnderTest.onLearningElementHighlighted(42);

    expect(systemUnderTest["viewModel"].isHighlighted.Value).toBe(true);
    jest.advanceTimersByTime(10000);
    expect(systemUnderTest["viewModel"].isHighlighted.Value).toBe(false);

    jest.useRealTimers();
  });

  test("onLearningElementHighlighted does not set isHighlighted if the id does not match", () => {
    viewModel.id = 0;
    viewModel.isHighlighted.Value = false;
    systemUnderTest.onLearningElementHighlighted(42);

    expect(systemUnderTest["viewModel"].isHighlighted.Value).toBe(false);
  });

  // ANF-ID: [EWE0035]
  test("onAvatarPositionChanged sets isInteractable to true when the avatar is in the interaction radius", () => {
    viewModel.position = new Vector3(0, 0, 0);
    viewModel.isInteractable.Value = false;
    systemUnderTest.onAvatarPositionChanged(new Vector3(0, 0, 0), 1);

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  // ANF-ID: [EWE0035]
  test("onAvatarPositionChanged sets isInteractable to false when the avatar is outside the interaction radius", () => {
    viewModel.position = new Vector3(0, 0, 0);
    viewModel.isInteractable.Value = true;
    systemUnderTest.onAvatarPositionChanged(new Vector3(0, 0, 2), 1);

    expect(viewModel.isInteractable.Value).toBe(false);
  });
});
