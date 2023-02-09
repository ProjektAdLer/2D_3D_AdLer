import NotificationManagerPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import NotificationManagerViewModel from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerViewModel";

describe("NotificationManagerPresenter", () => {
  let systemUnderTest: NotificationManagerPresenter;
  let vm: NotificationManagerViewModel;

  beforeEach(() => {
    vm = new NotificationManagerViewModel();
    systemUnderTest = new NotificationManagerPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    systemUnderTest.displayNotification("Hello World", "notification");
    expect(vm.errors.Value).toEqual([
      {
        message: "Hello World",
        type: "notification",
      },
    ]);
  });
});
