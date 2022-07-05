import Core from "../../Core/API/Core";
import CoreFactory from "../../Core/API/CoreFactory";

describe("CoreFactory", () => {
  test("createCore method creates Core instance", () => {
    var coreFactory = new CoreFactory();
    expect(coreFactory.createCore()).toBeInstanceOf(Core);
    // TODO: add more expect statements for more robust testing -MK
  });
});
