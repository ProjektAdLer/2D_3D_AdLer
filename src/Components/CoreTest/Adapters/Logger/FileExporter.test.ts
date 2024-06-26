import FileExporter from "../../../../Components/Core/Adapters/Logger/FileExporter";

describe("FileExporter", () => {
  URL.createObjectURL = (obj: File) => {
    return "test-url";
  };
  let systemUnderTest: FileExporter;

  beforeEach(() => {
    systemUnderTest = new FileExporter();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("FileExporter creates 'a' element, which gets clicked", () => {
    jest.spyOn(document, "createElement");
    jest.spyOn(HTMLAnchorElement.prototype, "click");

    let logString = "test log 1\ntest log 2\ntest log 3";
    systemUnderTest.exportLog(logString);
    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  test("generateFile creates a file", () => {
    jest.spyOn(URL, "createObjectURL");

    let logString = "test log 1\ntest log 2\ntest log 3";
    systemUnderTest.generateFile(logString);
    const expectedResult = new File([logString], "AdlerLog.txt");
    expect(URL.createObjectURL).toHaveBeenCalledWith(expectedResult);
  });

  test("generateFile sets correct url attribute", () => {
    jest.spyOn(HTMLAnchorElement.prototype, "setAttribute");
    let logString = "test log 1\ntest log 2\ntest log 3";
    systemUnderTest.generateFile(logString);
    expect(HTMLAnchorElement.prototype.setAttribute).toHaveBeenCalledWith(
      "href",
      "test-url"
    );
  });

  test("generateFile sets download attribute", () => {
    jest.spyOn(HTMLAnchorElement.prototype, "setAttribute");
    let logString = "test log 1\ntest log 2\ntest log 3";
    systemUnderTest.generateFile(logString);
    expect(HTMLAnchorElement.prototype.setAttribute).toHaveBeenCalledWith(
      "download",
      "AdLerLog.txt"
    );
  });
});
