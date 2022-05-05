export default interface PresentationBuilder {
  // reset can maybe be ommitted - MK
  reset(): void;
  buildViewModel(): void;
  buildController(): void;
  buildView(): void;
  buildPresenter(): void;
  getPresenter(): any;
  getController(): any;
  getViewModel(): any;
}
