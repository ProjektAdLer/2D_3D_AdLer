import IAsyncPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IAsyncPresentationBuilder";
import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";

export default class TestBuilder implements IPresentationBuilder {
  reset = jest.fn();
  buildViewModel = jest.fn();
  buildController = jest.fn();
  buildView = jest.fn();
  buildPresenter = jest.fn();
  getPresenter = jest.fn();
  getController = jest.fn();
  getViewModel = jest.fn();
  getView = jest.fn();
}

export class AsyncTestBuilder implements IAsyncPresentationBuilder {
  isCompleted: Promise<void> = Promise.resolve();
  resolvePromise = jest.fn();
  reset = jest.fn();
  buildViewModel = jest.fn();
  buildController = jest.fn();
  buildView = jest.fn();
  buildPresenter = jest.fn();
  getPresenter = jest.fn();
  getController = jest.fn();
  getViewModel = jest.fn();
  getView = jest.fn();
}
