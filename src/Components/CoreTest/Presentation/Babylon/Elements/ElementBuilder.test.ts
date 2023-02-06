import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import ElementBuilder from "../../../../Core/Presentation/Babylon/Elements/ElementBuilder";
import ElementPresenter from "../../../../Core/Presentation/Babylon/Elements/ElementPresenter";

const worldPortMock = mock<IWorldPort>();

describe("ElementBuilder", () => {
  let systemUnderTest: ElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ElementBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    // build results
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(ElementPresenter);

    // call to the element port
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
