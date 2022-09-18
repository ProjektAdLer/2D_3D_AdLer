import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import {
  ElementTO,
  SpaceTO,
  WorldTO,
} from "../../../Core/Ports/WorldPort/IWorldPort";
import WorldPort from "../../../Core/Ports/WorldPort/WorldPort";
import ISpacePresenter from "../../../Core/Presentation/Babylon/Spaces/ISpacePresenter";
import INavigation from "../../../Core/Presentation/Babylon/Navigation/INavigation";
import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import IElementsDropdownPresenter from "../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownPresenter";
import IWorldNamePanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import IWorldGoalPanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";

jest.mock("src/Lib/Logger");

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();

const navigationMock = mock<INavigation>();

const elementDropdownPresenterMock = mock<IElementsDropdownPresenter>();
const worldNamePanelPresenterMock = mock<IWorldNamePanelPresenter>();
const worldGoalPanelPresenterMock = mock<IWorldGoalPanelPresenter>();

describe("WorldPort", () => {
  let systemUnderTest: WorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.ISpaceBuilder
    ).toConstantValue(builderMock);

    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);

    CoreDIContainer.rebind<INavigation>(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(WorldPort);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("registerElementDropdownPresenter sets private member", () => {
    systemUnderTest.registerElementDropdownPresenter(
      elementDropdownPresenterMock
    );

    expect(systemUnderTest["elementDropdownPresenter"]).toBe(
      elementDropdownPresenterMock
    );
  });

  test("registerElementDropdownPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerElementDropdownPresenter(
      elementDropdownPresenterMock
    );
    systemUnderTest.registerElementDropdownPresenter(
      elementDropdownPresenterMock
    );

    expect(logger.warn).toBeCalledTimes(1);
  });

  test("registerWorldNamePanelPresenter sets private member", () => {
    systemUnderTest.registerWorldNamePanelPresenter(
      worldNamePanelPresenterMock
    );

    expect(systemUnderTest["worldNamePanelPresenter"]).toBe(
      worldNamePanelPresenterMock
    );
  });
  test("registerWorldGoalPanelPresenter sets private member", () => {
    systemUnderTest.registerWorldGoalPanelPresenter(
      worldGoalPanelPresenterMock
    );

    expect(systemUnderTest["worldGoalPanelPresenter"]).toBe(
      worldGoalPanelPresenterMock
    );
  });

  test("registerWorldNamePanelPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerWorldNamePanelPresenter(
      worldNamePanelPresenterMock
    );
    systemUnderTest.registerWorldNamePanelPresenter(
      worldNamePanelPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("registerWorldGoalPanelPresenter warns error if presenter is already registered", () => {
    systemUnderTest.registerWorldGoalPanelPresenter(
      worldGoalPanelPresenterMock
    );
    systemUnderTest.registerWorldGoalPanelPresenter(
      worldGoalPanelPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  // this needs to be reworked, when more than one space is supported
  test("presentWorld", () => {
    // ARRANGE
    // setup TOs
    const elementTO: ElementTO = {
      id: 1,
      elementData: {
        type: "h5p",
      },
      name: "test",
    };
    const spaceTO: SpaceTO = {
      id: 1,
      elements: [elementTO],
    };
    const worldTO: WorldTO = {
      worldName: "test",
      worldGoal: "test",
      spaces: [spaceTO],
    };

    // setup mocks
    const spacePresenterMock = mock<ISpacePresenter>();
    builderMock.getPresenter.mockReturnValue(spacePresenterMock);

    // register UI presenter
    systemUnderTest.registerElementDropdownPresenter(
      elementDropdownPresenterMock
    );
    systemUnderTest.registerWorldNamePanelPresenter(
      worldNamePanelPresenterMock
    );
    systemUnderTest.registerWorldGoalPanelPresenter(
      worldGoalPanelPresenterMock
    );

    // ACT
    systemUnderTest.presentWorld(worldTO);

    // ASSERT
    // building the space
    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(systemUnderTest["spacePresenter"]).toBe(spacePresenterMock);

    // presenting the space
    expect(spacePresenterMock.presentSpace).toHaveBeenCalledTimes(1);
    expect(spacePresenterMock.presentSpace).toHaveBeenCalledWith(spaceTO);

    // navigation setup
    expect(navigationMock.setupNavigation).toHaveBeenCalledTimes(1);

    // UI presentation
    expect(worldNamePanelPresenterMock.displayWorldName).toHaveBeenCalledTimes(
      1
    );
    expect(worldNamePanelPresenterMock.displayWorldName).toHaveBeenCalledWith(
      worldTO.worldName
    );
    expect(worldGoalPanelPresenterMock.displayWorldGoal).toHaveBeenCalledTimes(
      1
    );
    expect(worldGoalPanelPresenterMock.displayWorldGoal).toHaveBeenCalledWith(
      worldTO.worldGoal
    );
    expect(elementDropdownPresenterMock.presentElements).toHaveBeenCalledTimes(
      1
    );
    expect(elementDropdownPresenterMock.presentElements).toHaveBeenCalledWith(
      worldTO.spaces[0].elements
    );
  });
});
