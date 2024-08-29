import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import NotificationManagerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import NotificationManagerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import INotificationPort from "../../../../../Core/Application/Ports/Interfaces/INotificationPort";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const NotificationPortMock = mock<INotificationPort>();

describe("NotificationManagerBuilder", () => {
  let systemUnderTest: NotificationManagerBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      NotificationPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new NotificationManagerBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope._global);
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
    expect(NotificationPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(NotificationPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope._global
    );
  });
});
