import ElementPort from "../../../Core/Ports/ElementPort/ElementPort";
import IElementPresenter from "../../../Core/Presentation/Babylon/Elements/IElementPresenter";
import IElementModalPresenter from "../../../Core/Presentation/React/SpaceDisplay/ElementModal/IElementModalPresenter";
import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";
import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";

jest.mock("src/Lib/Logger");

describe("ElementPort", () => {
  let systemUnderTest: ElementPort;

  beforeEach(() => {
    systemUnderTest = new ElementPort();
  });

  test("addElementPresenter adds new presenter", () => {
    const elementPresenter: IElementPresenter = {
      presentElement: jest.fn(),
      onElementScored: function (hasScored: boolean, elementID: number): void {
        throw new Error("Function not implemented.");
      },
    };

    systemUnderTest.addElementPresenter(elementPresenter);

    expect(systemUnderTest["elementPresenters"]).toContain(elementPresenter);
  });

  test("addElementPresenter throws error if presenter is added again", () => {
    const elementPresenter: IElementPresenter = {
      presentElement: jest.fn(),
      onElementScored: function (hasScored: boolean, elementID: number): void {
        throw new Error("Function not implemented.");
      },
    };

    systemUnderTest.addElementPresenter(elementPresenter);

    expect(() => {
      systemUnderTest.addElementPresenter(elementPresenter);
    }).toThrowError("already added");
  });

  test("startElementEditing throws error if no ElementModalPresenter is registered", () => {
    expect(systemUnderTest["modalPresenter"]).not.toBeDefined();

    expect(() => {
      systemUnderTest.onElementLoaded({
        id: 1,
        name: "test",
      } as ElementTO);
    }).toThrowError("not registered");
  });

  test.skip("startElementEditing calls presentElementModal on elementModalPresenter", () => {
    const elementTO = {
      id: 1,
      name: "test",
    } as ElementTO;
    const elementModalPresenterMock = mock<IElementModalPresenter>();
    systemUnderTest.registerModalPresenter(elementModalPresenterMock);

    systemUnderTest.onElementLoaded(elementTO);

    expect(elementModalPresenterMock.presentElementModal).toHaveBeenCalledTimes(
      1
    );
    expect(elementModalPresenterMock.presentElementModal).toHaveBeenCalledWith(
      elementTO
    );
  });

  test("registerModalPresenter registers modalPresenter", () => {
    const elementModalPresenterMock = mock<IElementModalPresenter>();

    systemUnderTest.registerModalPresenter(elementModalPresenterMock);

    expect(systemUnderTest["modalPresenter"]).toBe(elementModalPresenterMock);
  });

  test("registerModalPresenter warns if modalPresenter is already registered", () => {
    const elementModalPresenterMock1 = mock<IElementModalPresenter>();
    systemUnderTest.registerModalPresenter(elementModalPresenterMock1);

    systemUnderTest.registerModalPresenter(elementModalPresenterMock1);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("registerModalPresenter overrides already registered presenter", () => {
    const elementModalPresenterMock1 = mock<IElementModalPresenter>();
    systemUnderTest.registerModalPresenter(elementModalPresenterMock1);
    const elementModalPresenterMock2 = mock<IElementModalPresenter>();

    systemUnderTest.registerModalPresenter(elementModalPresenterMock2);

    expect(systemUnderTest["modalPresenter"]).toBe(elementModalPresenterMock2);
  });

  test("should notify its adapters when element has scored", () => {
    const elementPresenterMock = mock<IElementPresenter>();
    systemUnderTest.addElementPresenter(elementPresenterMock);

    systemUnderTest.onElementScored(true, 1);

    expect(elementPresenterMock.onElementScored).toHaveBeenCalledTimes(1);
    expect(elementPresenterMock.onElementScored).toHaveBeenCalledWith(true, 1);
  });
});
