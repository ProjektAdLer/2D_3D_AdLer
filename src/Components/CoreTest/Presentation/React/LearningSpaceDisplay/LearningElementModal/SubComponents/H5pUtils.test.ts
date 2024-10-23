import { createRef, RefObject } from "react";
import Observable from "../../../../../../../Lib/Observable";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import {
  createH5POptions,
  getH5PContentSizeDecision,
  getH5PDivs,
  shrinkH5PElement,
} from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5pUtils";
import { config } from "../../../../../../../config";

const oldConfigServerURL = config.serverURL;

describe("H5pUtils", () => {
  let viewModelMock: LearningElementModalViewModel;

  beforeAll(() => {
    viewModelMock = new LearningElementModalViewModel();
  });

  beforeEach(() => {
    viewModelMock.filePath = new Observable<string>();
    viewModelMock.filePath.Value = "";
  });

  afterAll(() => {
    config.serverURL = oldConfigServerURL;
  });

  test("createH5POptions doesn't change url if no localhost is present", () => {
    config.serverURL = "https://dev.api.projekt-adler.eu";
    const result = createH5POptions(viewModelMock);

    expect(result.h5pJsonPath).toBe("https://dev.api.projekt-adler.eu");
  });

  test("createH5POptions changes url if localhost is present", () => {
    config.serverURL = "http://localhost:1337";
    const result = createH5POptions(viewModelMock);

    expect(result.h5pJsonPath).toBe("//localhost:1337");
  });

  test("getH5PDivs return null if no reference is available", () => {
    const element = document.createElement("div");
    const reference = { current: element } as RefObject<HTMLDivElement>;
    const result = getH5PDivs(reference);

    expect(result).toEqual(null);
  });

  test("getH5PDivs return null if no div is available", () => {
    const element = document.createElement("div");
    const htmlCollection = [element] as unknown as HTMLCollection;
    let nullReference = createRef<HTMLDivElement>();

    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(htmlCollection);

    const result = getH5PDivs(nullReference);
    expect(result).toEqual(null);
  });

  test("getH5PDivs returns reference and div if both are available", () => {
    const element = document.createElement("div");
    const reference = { current: element } as RefObject<HTMLDivElement>;
    const htmlCollection = [element] as unknown as HTMLCollection;

    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(htmlCollection);

    const result = getH5PDivs(reference);
    expect(result).not.toEqual(null);
  });

  test("getH5PContentSizeDecision returns true to shrinkContent if h5p elemnt is higher than max modal height", () => {
    //mock getH5PDivs
    const element = document.createElement("div");
    //const element = mock<HTMLDivElement>();
    const reference = { current: element } as RefObject<HTMLDivElement>;
    const htmlCollection = [element] as unknown as HTMLCollection;
    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(htmlCollection);

    jest.spyOn(Element.prototype, "clientHeight", "get").mockReturnValue(150);
    jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(200);

    const box = { width: 200, height: 100 } as unknown as DOMRectReadOnly;
    const entry = { contentRect: box } as unknown as ResizeObserverEntry;

    const result = getH5PContentSizeDecision(reference, entry, 200);

    expect(result.shrinkContent).toEqual(true);
  });

  test("getH5PContentSizeDecision returns true to resetContent if h5p elemnt is smaller than modal", () => {
    //mock getH5PDivs
    const element = document.createElement("div");
    const reference = { current: element } as RefObject<HTMLDivElement>;
    const htmlCollection = [element] as unknown as HTMLCollection;
    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(htmlCollection);

    jest.spyOn(Element.prototype, "clientHeight", "get").mockReturnValue(150);
    jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(200);

    window.innerHeight = 500;
    window.innerWidth = 300;

    const box = { width: 200, height: 100 } as unknown as DOMRectReadOnly;
    const entry = { contentRect: box } as unknown as ResizeObserverEntry;

    const result = getH5PContentSizeDecision(reference, entry, 200);

    expect(result.resetContent).toEqual(true);
  });

  test("shrinkH5PElement sets style to smaller value if h5p content height is bigger than modal height", () => {
    //mock getH5PDivs
    const element = document.createElement("div");
    element.style.width = "90vw";
    const reference = { current: element } as RefObject<HTMLDivElement>;
    const htmlCollection = [element] as unknown as HTMLCollection;
    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(htmlCollection);

    window.innerWidth = 400;
    window.innerHeight = 200;

    shrinkH5PElement(reference, {
      contentWidth: 300,
      contentHeight: 270,
      refWidth: 300,
      refHeight: 200,
    });

    expect(element.style.width).toBe("85vw");
  });
});
