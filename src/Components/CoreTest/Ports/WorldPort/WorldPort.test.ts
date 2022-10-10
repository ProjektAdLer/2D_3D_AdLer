import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";

import WorldPort from "../../../Core/Ports/WorldPort/WorldPort";
import INavigation from "../../../Core/Presentation/Babylon/Navigation/INavigation";
import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import IElementsDropdownPresenter from "../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownPresenter";
import IWorldNamePanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import IWorldGoalPanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";
import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";
import SpaceTO from "../../../Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../../Core/Application/DataTransferObjects/WorldTO";

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
      name: "test",
      value: 0,
      parentSpaceId: 0,
      description: "test",
      goals: "test",
      type: "h5p",
    };
    const spaceTO: SpaceTO = {
      id: 1,
      elements: [elementTO],
      name: "test",
      description: "test",
      goals: "test",
      requirements: [],
      requiredPoints: 0,
    };
    const worldTO: WorldTO = {
      description: "test",
      goals: "test",
      spaces: [spaceTO],
      worldName: "test",
      worldGoal: "test",
    };

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
