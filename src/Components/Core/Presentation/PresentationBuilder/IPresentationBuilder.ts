export default interface IPresentationBuilder {
  reset(): void;
  buildViewModel(): void;
  buildController(): void;
  buildView(): void;
  buildPresenter(): void;
  getPresenter(): any;
  getController(): any;
  getViewModel(): any;
  getView(): any;
}
