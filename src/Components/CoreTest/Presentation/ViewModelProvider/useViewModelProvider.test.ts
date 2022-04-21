import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IViewModelProvider from "../../../Core/Presentation/ViewModelProvider/IViewModelProvider";
import useViewModelProvider from "../../../Core/Presentation/ViewModelProvider/useViewModelProvider";

class TestViewModelA {}

describe("useViewModelProvider", () => {
  test.todo(
    "useViewModelProvider returns an array of viewModels"
    // , () => {
    // const viewModelProvider = CoreDIContainer.get<IViewModelProvider>(
    //   CORE_TYPES.IViewModelProvider
    // );
    // viewModelProvider.registerViewModel(new TestViewModelA(), TestViewModelA);
    // var viewModels = useViewModelProvider(TestViewModelA);
    // expect(viewModels.length).toBe(1);
    // expect(viewModels[0]).toBeInstanceOf(TestViewModelA);
    // }
  );
});
