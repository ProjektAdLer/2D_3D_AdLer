import NotificationManagerPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import INotificationManagerPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import NotificationManagerViewModel from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerViewModel";

describe("NotificationManagerPresenter", () => {
  let systemUnderTest: INotificationManagerPresenter;
  let vm: NotificationManagerViewModel;

  beforeEach(() => {
    vm = new NotificationManagerViewModel();
    systemUnderTest = new NotificationManagerPresenter(vm);
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
