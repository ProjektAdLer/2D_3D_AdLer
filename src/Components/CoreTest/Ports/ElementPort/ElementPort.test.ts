import ElementPort from "../../../Core/Ports/ElementPort/ElementPort";
import { ElementTO } from "../../../Core/Ports/WorldPort/IWorldPort";
import IElementPresenter from "../../../Core/Presentation/Babylon/Elements/IElementPresenter";
import IElementModalPresenter from "../../../Core/Presentation/React/SpaceDisplay/ElementModal/IElementModalPresenter";
import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

describe("ElementPort", () => {
  let systemUnderTest: ElementPort;

  beforeEach(() => {
    systemUnderTest = new ElementPort();
  });

  test("addElementPresenter adds new presenter", () => {
    const elementPresenter: IElementPresenter = {
      presentElement: jest.fn(),
    };

    systemUnderTest.addElementPresenter(elementPresenter);

    expect(systemUnderTest["elementPresenters"]).toContain(elementPresenter);
  });

  test("addElementPresenter throws error if presenter is added again", () => {
    const elementPresenter: IElementPresenter = {
      presentElement: jest.fn(),
    };

    systemUnderTest.addElementPresenter(elementPresenter);

    expect(() => {
      systemUnderTest.addElementPresenter(elementPresenter);
    }).toThrowError("already added");
  });

  test("startElementEditing throws error if no ElementModalPresenter is registered", () => {
    expect(systemUnderTest["modalPresenter"]).not.toBeDefined();

    expect(() => {
      systemUnderTest.startElementEditing({
        id: 1,
        name: "test",
        elementData: {
          type: "h5p",
        },
      } as ElementTO);
    }).toThrowError("not registered");
  });

  test("startElementEditing calls presentElementModal on elementModalPresenter", () => {
    const elementTO: ElementTO = {
      id: 1,
      name: "test",
      elementData: {
        type: "h5p",
      },
    };
    const elementModalPresenterMock = mock<IElementModalPresenter>();
    systemUnderTest.registerModalPresenter(elementModalPresenterMock);

    systemUnderTest.startElementEditing(elementTO);

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
});
