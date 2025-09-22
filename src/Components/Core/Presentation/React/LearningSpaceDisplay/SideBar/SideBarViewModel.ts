// Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel.ts

import Observable from "src/Lib/Observable";
import { sideBarButtons, SideBarButtonConfig } from "./SideBarButtons";

export default class SideBarViewModel {
  allowWorldCompletionModalButtonClick: boolean = false;
  // Story buttons
  hasIntroStory: boolean = false;
  hasOutroStory: boolean = false;
  allowIntroStoryButtonClick: boolean = false;
  allowOutroStoryButtonClick: boolean = false;
  allowNarrativeFrameworkIntroButtonClick: Observable<boolean> = new Observable(
    false,
    false,
  );

  // Add this new property
  public isMobile: Observable<boolean> = new Observable(false);

  // Pagination properties
  public readonly buttonsPerPage = 9;
  public allButtons: SideBarButtonConfig[] = sideBarButtons;
  public currentPage: Observable<number> = new Observable<number>(1);
  public totalPages: Observable<number> = new Observable<number>(1);

  constructor() {
    // Calculate the total number of pages based on visible buttons
    this.updateTotalPages();
  }

  public updateTotalPages(): void {
    const visibleButtons = this.getVisibleButtons();
    const totalPages = Math.ceil(visibleButtons.length / this.buttonsPerPage);
    this.totalPages.Value = Math.max(1, totalPages);

    // Ensure that the current page is not larger than the total number
    if (this.currentPage.Value > this.totalPages.Value) {
      this.currentPage.Value = this.totalPages.Value;
    }
  }

  public getVisibleButtons(): SideBarButtonConfig[] {
    return this.allButtons.filter((button) => {
      // Normal visibility logic
      return !button.visible || button.visible(this);
    });
  }
}
