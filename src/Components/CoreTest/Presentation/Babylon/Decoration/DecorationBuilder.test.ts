import { mock } from "jest-mock-extended";
import DecorationBuilder from "../../../../Core/Presentation/Babylon/Decoration/DecorationBuilder";
import DecorationView from "../../../../Core/Presentation/Babylon/Decoration/DecorationView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import { waitFor } from "@testing-library/react";

jest.mock("../../../../Core/Presentation/Babylon/Decoration/DecorationView");

describe("DecorationBuilder", () => {
  let systemUnderTest: DecorationBuilder;

  beforeEach(() => {
    systemUnderTest = new DecorationBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.spaceTemplate = "Test";
    systemUnderTest.buildViewModel();
    const viewMock = mock<DecorationView>();
    viewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });
  test("buildView logs the error which the asyncSetup of the view rejects", async () => {
    systemUnderTest.spaceTemplate = "Test";
    systemUnderTest.buildViewModel();
    const viewMock = mock<DecorationView>();
    viewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
  test("buildViewModel throws an error when spaceTemplate is not defined", () => {
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError(
      "SpaceTemplate is not defined. Set before using the builder."
    );
  });
});
