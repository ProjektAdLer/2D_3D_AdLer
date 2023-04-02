import LearningSpaceBuilder from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";

jest.mock("@babylonjs/core");
const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceBuilder", () => {
  let systemUnderTest: LearningSpaceBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
