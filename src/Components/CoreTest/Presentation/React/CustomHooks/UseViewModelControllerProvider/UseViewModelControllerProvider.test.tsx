import { renderHook } from "@testing-library/react";
import useViewModelControllerProvider from "../../../../../Core/Presentation/React/CustomHooks/useViewModelControllerProvider";
import Observable from "../../../../../../Lib/Observable";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";

class TestVM {
  public worldName = new Observable<string>();
}

class TestController {
  public test = "test";
}

const providerMock = mock<IViewModelControllerProvider>();

let callbackReturn: (tupels: [any, any][]) => void;

describe("UseViewModelControllerProviderHook", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<IViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(providerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("registers and unregisters request", () => {
    providerMock.registerTupelRequest.mockImplementation(
      (callBack: any, vmType: any) => {
        callbackReturn = callBack;
      }
    );

    const wrapper = ({ children }: { children: any }) => (
      <Provider container={CoreDIContainer}>{children}</Provider>
    );

    const systemUnderTest = renderHook(
      () => useViewModelControllerProvider(TestVM),
      { wrapper }
    );

    expect(providerMock.registerTupelRequest).toHaveBeenCalledWith(
      expect.any(Function),
      TestVM
    );

    systemUnderTest.unmount();

    expect(providerMock.cancelRequest).toHaveBeenCalledWith(
      expect.any(Function),
      TestVM
    );

    callbackReturn([[new TestVM(), new TestController()]]);
  });
});
