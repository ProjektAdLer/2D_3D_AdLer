import ModalManagerPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerPresenter";
import IModalManagerPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ModalManager/IModalManagerPresenter";
import ModalManagerViewModel from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerViewModel";

describe("ModalManagerPresenter", () => {
  let systemUnderTest: IModalManagerPresenter;
  let vm: ModalManagerViewModel;

  beforeEach(() => {
    vm = new ModalManagerViewModel();
    systemUnderTest = new ModalManagerPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    systemUnderTest.presentErrorMessage("Hello World", "notification");
    expect(vm.errors.Value).toEqual([
      {
        message: "Hello World",
        type: "notification",
      },
    ]);
  });
});
