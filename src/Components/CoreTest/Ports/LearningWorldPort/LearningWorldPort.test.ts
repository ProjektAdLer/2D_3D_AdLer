import { mock } from "jest-mock-extended";
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
import ILearningElementsDropdownPresenter from "../../../Core/Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import ILearningWorldNamePanelPresenter from "../../../Core/Presentation/React/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();

const navigationMock = mock<INavigation>();

const learningElementDropdownPresenterMock =
  mock<ILearningElementsDropdownPresenter>();
const learningWorldPanelPresenterMock =
  mock<ILearningWorldNamePanelPresenter>();

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

  test("registerLearningElementDropdownPresenter throws error if presenter is already registered", () => {
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );

    expect(() => {
      systemUnderTest.registerLearningElementDropdownPresenter(
        learningElementDropdownPresenterMock
      );
    }).toThrowError("LearningElementDropdownPresenter is already registered");
  });

  test("registerLearningWorldPanelPresenter sets private member", () => {
    systemUnderTest.registerLearningWorldPanelPresenter(
      learningWorldPanelPresenterMock
    );

    expect(systemUnderTest["learningWorldPanelPresenter"]).toBe(
      learningWorldPanelPresenterMock
    );
  });

  test("registerLearningWorldPanelPresenter throws error if presenter is already registered", () => {
    systemUnderTest.registerLearningWorldPanelPresenter(
      learningWorldPanelPresenterMock
    );

    expect(() => {
      systemUnderTest.registerLearningWorldPanelPresenter(
        learningWorldPanelPresenterMock
      );
    }).toThrowError("LearningWorldPanelPresenter is already registered");
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
      learningRooms: [learningRoomTO],
    };

    // setup mocks
    const roomPresenterMock = mock<ILearningRoomPresenter>();
    builderMock.getPresenter.mockReturnValue(roomPresenterMock);

    // register UI presenter
    systemUnderTest.registerLearningElementDropdownPresenter(
      learningElementDropdownPresenterMock
    );
    systemUnderTest.registerLearningWorldPanelPresenter(
      learningWorldPanelPresenterMock
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
      learningWorldPanelPresenterMock.displayWorldName
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldPanelPresenterMock.displayWorldName
    ).toHaveBeenCalledWith(learningWorldTO.worldName);
    expect(
      learningElementDropdownPresenterMock.presentLearningElements
    ).toHaveBeenCalledTimes(1);
    expect(
      learningElementDropdownPresenterMock.presentLearningElements
    ).toHaveBeenCalledWith(learningWorldTO.learningRooms[0].learningElements);
  });
});
