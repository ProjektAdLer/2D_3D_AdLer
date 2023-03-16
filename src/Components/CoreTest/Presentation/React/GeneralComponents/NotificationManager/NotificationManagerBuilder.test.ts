import { mock } from "jest-mock-extended";
import IUIPort from "../../../../../Core/Application/Ports/Interfaces/IUIPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import NotificationManagerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import NotificationManagerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";

const UIPortMock = mock<IUIPort>();

describe("NotificationManagerBuilder", () => {
  let systemUnderTest: NotificationManagerBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(UIPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new NotificationManagerBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      NotificationManagerPresenter
    );
    expect(UIPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(UIPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
