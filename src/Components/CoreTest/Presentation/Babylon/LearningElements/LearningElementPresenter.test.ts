import mock from "jest-mock-extended/lib/Mock";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementPresenter";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import { Mesh, Vector3 } from "@babylonjs/core";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import { FocusableTypes } from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFocusable";

describe("LearningElementPresenter", () => {
  let systemUnderTest: LearningElementPresenter;
  let viewModel: LearningElementViewModel;

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementPresenter(viewModel);
  });

  test("FocusableCenterPosition getter calculates value on first call", () => {
    const mockMesh = mock<Mesh>();
    mockMesh.getHierarchyBoundingVectors.mockReturnValue({
      min: new Vector3(0, 0, 0),
      max: new Vector3(0, 1, 42),
    });
    viewModel.modelMeshes = [mockMesh];

    expect(systemUnderTest["centerPosition"]).toBeUndefined();
    expect(systemUnderTest.getFocusableCenterPosition()).toEqual(
      new Vector3(0, 0, 21),
    );
  });

  test("FocusableCenterPosition getter returns cached value on subsequent calls", () => {
    const mockMesh = mock<Mesh>();
    viewModel.modelMeshes = [mockMesh];
    systemUnderTest["centerPosition"] = new Vector3(0, 0, 21);

    expect(mockMesh.getHierarchyBoundingVectors).not.toHaveBeenCalled();
    expect(systemUnderTest.getFocusableCenterPosition()).toEqual(
      new Vector3(0, 0, 21),
    );
  });

  test("isSpecialFocused returns value of isSpecialFocused in viewmodel", () => {
    systemUnderTest["viewModel"].isSpecialFocused = true;
    expect(systemUnderTest.isSpecialFocused()).toEqual(true);
  });

  test("onSpecialFocues sets isSpecialFocused to true", () => {
    systemUnderTest["viewModel"].isSpecialFocused = false;
    systemUnderTest.onSpecialFocused();
    expect(systemUnderTest["viewModel"].isSpecialFocused).toBe(true);
  });

  test("onSpecialUnFocues sets isSpecialFocused to false", () => {
    systemUnderTest["viewModel"].isSpecialFocused = true;
    systemUnderTest.onSpecialUnfocused();
    expect(systemUnderTest["viewModel"].isSpecialFocused).toBe(false);
  });

  test("getID returns id and type of learningelement", () => {
    systemUnderTest["viewModel"].id = 42;
    systemUnderTest["viewModel"].type = FocusableTypes.learningElement;
    expect(systemUnderTest.getID()).toEqual({
      id: 42,
      type: FocusableTypes.learningElement,
    });
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
  test("onFocused sets isInteractable to true", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest.onFocused();

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  // ANF-ID: [EWE0035]
  test("onUnfocused sets isInteractable to false", () => {
    viewModel.isInteractable.Value = true;

    systemUnderTest.onUnfocused();

    expect(viewModel.isInteractable.Value).toBe(false);
  });

  test("onStoryElementCutSceneTriggered sets interactable to false", () => {
    viewModel.isInteractable.Value = true;
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.isInteractable.Value).toEqual(false);
  });

  test("onStoryElementCutSceneFinished sets interactable to true if it was interactable before", () => {
    viewModel.isInteractable.Value = true;
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);
    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.isInteractable.Value).toEqual(true);
  });
});
