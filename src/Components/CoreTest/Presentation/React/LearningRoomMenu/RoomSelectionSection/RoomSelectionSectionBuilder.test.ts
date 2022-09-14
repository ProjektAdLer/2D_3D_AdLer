import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "../../../../../Core/Ports/LearningWorldPort/ILearningWorldAdapter";
import RoomSelectionSectionBuilder from "../../../../../Core/Presentation/React/RoomMenu/RoomSelectionSection/RoomSelectionSectionBuilder";

const learningWorldPortMock = mock<AbstractPort<ILearningWorldAdapter>>();

describe("RoomSelectionSectionBuilder", () => {
  let systemUnderTest: RoomSelectionSectionBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new RoomSelectionSectionBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter registers presenter with LearningWorldPort", () => {
    // build view model first
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(learningWorldPortMock.registerAdapter).toBeCalledTimes(1);
    expect(learningWorldPortMock.registerAdapter).toBeCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
