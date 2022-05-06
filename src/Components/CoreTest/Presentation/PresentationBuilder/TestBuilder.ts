import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";

export default class TestBuilder implements IPresentationBuilder {
  reset(): void {}
  buildViewModel(): void {}
  buildController(): void {}
  buildView(): void {}
  buildPresenter(): void {}
  getPresenter() {}
  getController() {}
  getViewModel() {}
}
