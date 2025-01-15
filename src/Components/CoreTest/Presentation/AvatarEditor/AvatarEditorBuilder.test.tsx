import mock from "jest-mock-extended/lib/Mock";
import AvatarEditorBuilder from "../../../../../src/Components/Core/Presentation/AvatarEditor/AvatarEditorBuilder";
import IAvatarPort from "../../../Core/Application/Ports/Interfaces/IAvatarPort";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";

const avatarPortMock = mock<IAvatarPort>();

describe("HelpDeskButtonBuilder", () => {
  let systemUnderTest: AvatarEditorBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IAvatarPort>(PORT_TYPES.IAvatarPort).toConstantValue(
      avatarPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new AvatarEditorBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.avatarEditor);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("builder does its job of building the mvc construct", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });

  test("buildPresenter builds the presenter and registers it with the AvatarPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(avatarPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(avatarPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.avatarEditor,
    );
  });
});
