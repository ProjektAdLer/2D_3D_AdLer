import LearningElementPanelViewModel from "./LearningElementPanelViewModel";

export default interface ILearningElementPanelPresenter {
  getViewModel(): LearningElementPanelViewModel;

  clicked(): void;
}
