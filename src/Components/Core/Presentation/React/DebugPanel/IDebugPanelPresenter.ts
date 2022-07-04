export default interface IDebugPanelPresenter {
  setMoodleToken(moodleToken: string): void;
  setMisc(misc: { key: string; value: string }): void;
}
