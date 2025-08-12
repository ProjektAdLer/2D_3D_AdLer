import { Vector3 } from "@babylonjs/core";
import WindowBuilder from "../../../../Core/Presentation/Babylon/Window/WindowBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import WindowView from "../../../../Core/Presentation/Babylon/Window/WindowView";
import { mock } from "jest-mock-extended";
import { waitFor } from "@testing-library/react";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

jest.mock("@babylonjs/core");
jest.mock("../../../../Core/Presentation/Babylon/Window/WindowView");
describe("WindowBuilder", () => {
  let systemUnderTest: WindowBuilder;

  beforeEach(() => {
    systemUnderTest = new WindowBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
  test("buildViewModel throws an error when position or rotation is not defined", () => {
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("WindowBuilder: one or more properties are undefined.");
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.theme = ThemeType.Campus;

    systemUnderTest.buildViewModel();
    const viewMock = mock<WindowView>();
    viewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error which the asyncSetup of the view rejects", async () => {
    systemUnderTest.position = new Vector3(0, 0, 0);
    systemUnderTest.rotation = 0;
    systemUnderTest.theme = ThemeType.Campus;

    systemUnderTest.buildViewModel();
    const viewMock = mock<WindowView>();
    viewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
});
