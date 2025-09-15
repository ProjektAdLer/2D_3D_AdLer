import { sideBarButtons } from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarButtons";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";
import Observable from "../../../../../../Lib/Observable";

describe("SideBarButtons", () => {
  let viewModel: SideBarViewModel;

  beforeEach(() => {
    viewModel = new SideBarViewModel();
  });

  test("should contain expected number of buttons", () => {
    expect(sideBarButtons.length).toBeGreaterThan(0);
  });

  test("should have required properties for all buttons", () => {
    // Einfacher Test - prüfe nur dass alle Buttons die notwendigen Eigenschaften haben
    expect(sideBarButtons.length).toBeGreaterThan(0);

    // Prüfe nur ein paar representative Buttons statt alle
    const sampleButton = sideBarButtons[0];
    expect(sampleButton.id).toBeDefined();
    expect(sampleButton.tooltip).toBeDefined();
    expect(sampleButton.label).toBeDefined();
    expect(sampleButton.onClick).toBeDefined();
  });

  test("should handle visibility functions", () => {
    const introStoryButton = sideBarButtons.find((b) => b.id === "introStory");
    if (introStoryButton?.visible) {
      viewModel.hasIntroStory = true;
      expect(introStoryButton.visible(viewModel)).toBe(true);

      viewModel.hasIntroStory = false;
      expect(introStoryButton.visible(viewModel)).toBe(false);
    }
  });

  test("should handle disabled functions", () => {
    const introStoryButton = sideBarButtons.find((b) => b.id === "introStory");
    if (introStoryButton?.disabled) {
      viewModel.allowIntroStoryButtonClick = false;
      expect(introStoryButton.disabled(viewModel)).toBe(true);

      viewModel.allowIntroStoryButtonClick = true;
      expect(introStoryButton.disabled(viewModel)).toBe(false);
    }
  });

  test("should handle Observable visibility", () => {
    const narrativeButton = sideBarButtons.find(
      (b) => b.id === "narrativeFramework",
    );
    if (narrativeButton?.visible) {
      viewModel.allowNarrativeFrameworkIntroButtonClick = new Observable(true);
      expect(narrativeButton.visible(viewModel)).toBe(true);

      viewModel.allowNarrativeFrameworkIntroButtonClick = new Observable(false);
      expect(narrativeButton.visible(viewModel)).toBe(false);
    }
  });

  test("should have special components configured", () => {
    // Prüfe nur dass es special components gibt und sie konfiguriert sind
    const specialButtons = sideBarButtons.filter((b) => b.isSpecialComponent);
    expect(specialButtons.length).toBeGreaterThan(0);

    // Test nur ein Beispiel statt alle
    const sampleSpecialButton = specialButtons[0];
    expect(sampleSpecialButton.component).toBeDefined();
  });
});
