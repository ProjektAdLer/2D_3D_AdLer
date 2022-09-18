import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IElementPort from "../../../../../Core/Ports/ElementPort/IElementPort";
import ElementModalBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalBuilder";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import ViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);

const elementPortMock = mock<IElementPort>();

describe("elementModalBuilder", () => {
  let systemUnderTest: ElementModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IElementPort>(
      PORT_TYPES.IElementPort
    ).toConstantValue(elementPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new ElementModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
    expect(registerTupelMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      ElementModalViewModel
    );
  });

  test("buildPresenter builds the presenter and registers presenter with the ElementPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(elementPortMock.registerModalPresenter).toHaveBeenCalledTimes(1);
    expect(elementPortMock.registerModalPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
