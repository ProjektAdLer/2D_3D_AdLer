import { mock } from "jest-mock-extended";
import StandInDecorationBuilder from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationBuilder";
import StandInDecorationView from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import { Vector3 } from "@babylonjs/core";
import { waitFor } from "@testing-library/react";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

jest.mock(
  "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationView",
);

describe("StandInDecorationBuilder", () => {
  let systemUnderTest: StandInDecorationBuilder;

  beforeEach(() => {
    systemUnderTest = new StandInDecorationBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.position = new Vector3(1, 1, 1);
    systemUnderTest.rotation = 1;
    systemUnderTest.spaceName = "Test";
    systemUnderTest.slotNumber = 1;
    systemUnderTest.theme = ThemeType.Campus;
    systemUnderTest.buildViewModel();
    const viewMock = mock<StandInDecorationView>();
    viewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error which the asyncSetup of the view rejects", async () => {
    systemUnderTest.position = new Vector3(1, 1, 1);
    systemUnderTest.rotation = 1;
    systemUnderTest.spaceName = "Test";
    systemUnderTest.slotNumber = 1;
    systemUnderTest.theme = ThemeType.Campus;
    systemUnderTest.buildViewModel();
    const viewMock = mock<StandInDecorationView>();
    viewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });

  test("buildViewModel throws an error when position, rotation, spacename or slotnumber is not defined", () => {
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError(
      "Position: undefined, Rotation: undefined, SpaceName: undefined or SlotNumber: undefined is not defined. Set before using the builder.",
    );
  });
});
