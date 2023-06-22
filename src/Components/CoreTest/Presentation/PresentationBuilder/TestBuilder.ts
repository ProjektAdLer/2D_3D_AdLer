import IAsyncPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IAsyncPresentationBuilder";
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
  getView() {}
}

export class AsyncTestBuilder implements IAsyncPresentationBuilder {
  constructor() {
    this.isCompleted = new Promise<void>((resolve) => {
      this.resolvePromise = resolve;
    });
  }
  isCompleted: Promise<void>;
  resolvePromise: (value: void | PromiseLike<void>) => void;
  reset(): void {}
  buildViewModel(): void {}
  buildController(): void {}
  buildView(): void {}
  buildPresenter(): void {}
  getPresenter() {}
  getController() {}
  getViewModel() {}
  getView() {}
}
