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
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";

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

    jest.clearAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildViewModel throws an error when position is undefined", () => {
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel throws an error when rotation is undefined", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel throws an error when theme is undefined", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel throws an error when isExit is undefined", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel throws an error when spaceID is undefined", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel throws an error when isOpen is undefined", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("DoorBuilder: one or more properties are undefined.");
  });

  test("buildViewModel successfully sets all properties on viewModel", () => {
    const position = new Vector3(1, 2, 3);
    const rotation = 90;
    const theme = LearningSpaceThemeType.CampusAB;
    const isExit = true;
    const spaceID = 123;
    const isOpen = true;

    systemUnderTest.position = position;
    systemUnderTest.rotation = rotation;
    systemUnderTest.theme = theme;
    systemUnderTest.isExit = isExit;
    systemUnderTest.spaceID = spaceID;
    systemUnderTest.isOpen = isOpen;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]!.position).toBe(position);
    expect(systemUnderTest["viewModel"]!.rotation).toBe(rotation);
    expect(systemUnderTest["viewModel"]!.theme).toBe(theme);
    expect(systemUnderTest["viewModel"]!.isExit).toBe(isExit);
    expect(systemUnderTest["viewModel"]!.spaceID).toBe(spaceID);
    expect(systemUnderTest["viewModel"]!.isOpen.Value).toBe(isOpen);
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

    await waitFor(() => {
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

  test("buildPresenter binds presenter to DI container", () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.isExit = false;
    systemUnderTest.spaceID = 0;
    systemUnderTest.isOpen = false;
    systemUnderTest.theme = LearningSpaceThemeType.Campus;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    // Verify that the presenter is bound to the DI container
    const boundPresenter = CoreDIContainer.getAll<IDoorPresenter>(
      PRESENTATION_TYPES.IDoorPresenter,
    );
    expect(boundPresenter).toContain(systemUnderTest["presenter"]);
  });

  test("builder properties can be set in fluent interface style", () => {
    const position = new Vector3(1, 2, 3);
    const rotation = 45;

    systemUnderTest.position = position;
    systemUnderTest.rotation = rotation;

    expect(systemUnderTest.position).toBe(position);
    expect(systemUnderTest.rotation).toBe(rotation);
  });
});
