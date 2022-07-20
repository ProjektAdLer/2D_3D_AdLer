import DoorBuilder from "../../../../Core/Presentation/Babylon/Door/DoorBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);

describe("DoorBuilder", () => {
  let systemUnderTest: DoorBuilder;

  beforeEach(() => {
    systemUnderTest = new DoorBuilder();
  });
  afterAll(() => {
    registerTupelMock.mockRestore();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildController registers view model and controller with the provider", () => {
    systemUnderTest.buildController();
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
  });
});
