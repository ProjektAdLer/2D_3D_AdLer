import FileExporter from "../../../../Components/Core/Adapters/Logger/FileExporter";
describe("FileExporter", () => {
  let systemUnderTest: FileExporter;

  beforeEach(() => {
    systemUnderTest = new FileExporter();
  });

  test.skip("FileExporter creates 'a' element, which gets clicked", () => {
    let logString = "test log";
    systemUnderTest.exportLog(logString);
    expect(document.getElementsByTagName("a").length).toBe(1);
  });
});
