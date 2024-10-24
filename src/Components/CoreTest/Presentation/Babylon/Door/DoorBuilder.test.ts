import { mock } from "jest-mock-extended";
import DoorBuilder from "../../../../Core/Presentation/Babylon/Door/DoorBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { Vector3 } from "@babylonjs/core";
import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import { waitFor } from "@testing-library/react";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarFocusSelection from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFokusSelection";

jest.mock("@babylonjs/core");
jest.mock("../../../../Core/Presentation/Babylon/Door/DoorView");
jest.mock("../../../../Core/Presentation/Babylon/Door/DoorController");

const worldPortMock = mock<ILearningWorldPort>();
const avatarFocusSelectionMock = mock<IAvatarFocusSelection>();

describe("DoorBuilder", () => {
  let systemUnderTest: DoorBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).toConstantValue(worldPortMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mock());
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter,
    ).toConstantValue(mock());
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    ).toConstantValue(avatarFocusSelectionMock);
  });

  beforeEach(() => {
    systemUnderTest = new DoorBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceDisplay);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildViewModel throws an error when position, rotation, isexit or spaceid is not defined", () => {
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewMock = mock<DoorView>();
    viewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error which the asyncSetup of the view rejects", async () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewMock = mock<DoorView>();
    viewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope._sceneRendering,
    );
  });

  test("buildPresenter registers presenter with avatarFocusSelection", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(avatarFocusSelectionMock.registerFocusable).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
    );
  });
});
