import Observable from "src/Lib/Observable";

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
}
