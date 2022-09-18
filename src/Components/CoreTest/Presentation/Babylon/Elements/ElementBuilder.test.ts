import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IElementPort from "../../../../Core/Ports/ElementPort/IElementPort";
import ElementBuilder from "../../../../Core/Presentation/Babylon/Elements/ElementBuilder";
import ElementPresenter from "../../../../Core/Presentation/Babylon/Elements/ElementPresenter";

const elementPortMock = mock<IElementPort>();

describe("ElementBuilder", () => {
  let systemUnderTest: ElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IElementPort).toConstantValue(
      elementPortMock
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
    expect(elementPortMock.addElementPresenter).toHaveBeenCalledTimes(1);
    expect(elementPortMock.addElementPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
