import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import {
  LearningElementTO,
  LearningRoomTO,
  LearningWorldTO,
} from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningWorldPort from "../../../Core/Ports/LearningWorldPort/LearningWorldPort";
import ILearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import INavigation from "../../../Core/Presentation/Babylon/Navigation/INavigation";
import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import ILearningElementsDropdownPresenter from "../../../Core/Presentation/React/LearningRoomDisplay/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import ILearningWorldNamePanelPresenter from "../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import ILearningWorldGoalPanelPresenter from "../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldGoalPanel/ILearningWorldGoalPanelPresenter";

jest.mock("src/Lib/Logger");

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();

const navigationMock = mock<INavigation>();

const learningElementDropdownPresenterMock =
  mock<ILearningElementsDropdownPresenter>();
const learningWorldNamePanelPresenterMock =
  mock<ILearningWorldNamePanelPresenter>();
const learningWorldGoalPanelPresenterMock =
  mock<ILearningWorldGoalPanelPresenter>();

describe("LearningWorldPort", () => {
  let systemUnderTest: LearningWorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.ILearningRoomBuilder
    ).toConstantValue(builderMock);

    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);

    CoreDIContainer.rebind<INavigation>(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LearningWorldPort);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("registerLearningElementDropdownPresenter sets private member", () => {
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );

    expect(systemUnderTest["learningElementDropdownPresenter"]).toBe(
      learningElementDropdownPresenterMock
    );
  });

  test("registerLearningElementDropdownPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );

    expect(logger.warn).toBeCalledTimes(1);
  });

  test("registerLearningWorldNamePanelPresenter sets private member", () => {
    systemUnderTest.registerLearningWorldNamePanelPresenter(
      learningWorldNamePanelPresenterMock
    );

    expect(systemUnderTest["learningWorldNamePanelPresenter"]).toBe(
      learningWorldNamePanelPresenterMock
    );
  });
  test("registerLearningWorldGoalPanelPresenter sets private member", () => {
    systemUnderTest.registerLearningWorldGoalPanelPresenter(
      learningWorldGoalPanelPresenterMock
    );

    expect(systemUnderTest["learningWorldGoalPanelPresenter"]).toBe(
      learningWorldGoalPanelPresenterMock
    );
  });

  test("registerLearningWorldNamePanelPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerLearningWorldNamePanelPresenter(
      learningWorldNamePanelPresenterMock
    );
    systemUnderTest.registerLearningWorldNamePanelPresenter(
      learningWorldNamePanelPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("registerLearningWorldGoalPanelPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerLearningWorldGoalPanelPresenter(
      learningWorldGoalPanelPresenterMock
    );
    systemUnderTest.registerLearningWorldGoalPanelPresenter(
      learningWorldGoalPanelPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  // this needs to be reworked, when more than one learning room is supported
  test("presentLearningWorld", () => {
    // ARRANGE
    // setup TOs
    const learningElementTO: LearningElementTO = {
      id: 1,
      learningElementData: {
        type: "h5p",
      },
      name: "test",
    };
    const learningRoomTO: LearningRoomTO = {
      id: 1,
      learningElements: [learningElementTO],
    };
    const learningWorldTO: LearningWorldTO = {
      worldName: "test",
      worldGoal: "test",
      learningRooms: [learningRoomTO],
    };

    // setup mocks
    const roomPresenterMock = mock<ILearningRoomPresenter>();
    builderMock.getPresenter.mockReturnValue(roomPresenterMock);

    // register UI presenter
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );
    systemUnderTest.registerLearningWorldNamePanelPresenter(
      learningWorldNamePanelPresenterMock
    );
    systemUnderTest.registerLearningWorldGoalPanelPresenter(
      learningWorldGoalPanelPresenterMock
    );

    // ACT
    systemUnderTest.presentLearningWorld(learningWorldTO);

    // ASSERT
    // building the room
    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(systemUnderTest["roomPresenter"]).toBe(roomPresenterMock);

    // presenting the room
    expect(roomPresenterMock.presentLearningRoom).toHaveBeenCalledTimes(1);
    expect(roomPresenterMock.presentLearningRoom).toHaveBeenCalledWith(
      learningRoomTO
    );

    // navigation setup
    expect(navigationMock.setupNavigation).toHaveBeenCalledTimes(1);

    // UI presentation
    expect(
      learningWorldNamePanelPresenterMock.displayWorldName
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldNamePanelPresenterMock.displayWorldName
    ).toHaveBeenCalledWith(learningWorldTO.worldName);
    expect(
      learningWorldGoalPanelPresenterMock.displayWorldGoal
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldGoalPanelPresenterMock.displayWorldGoal
    ).toHaveBeenCalledWith(learningWorldTO.worldGoal);
    expect(
      learningElementDropdownPresenterMock.presentLearningElements
    ).toHaveBeenCalledTimes(1);
    expect(
      learningElementDropdownPresenterMock.presentLearningElements
    ).toHaveBeenCalledWith(learningWorldTO.learningRooms[0].learningElements);
  });
});
