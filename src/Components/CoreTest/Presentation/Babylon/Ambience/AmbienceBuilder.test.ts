import { mock } from "jest-mock-extended";
import AmbienceBuilder from "../../../../Core/Presentation/Babylon/Ambience/AmbienceBuilder";
import AmbienceView from "../../../../Core/Presentation/Babylon/Ambience/AmbienceView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import { waitFor } from "@testing-library/react";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

jest.mock("../../../../Core/Presentation/Babylon/Ambience/AmbienceView");

describe("AmbienceBuilder", () => {
  let systemUnderTest: AmbienceBuilder;

  beforeEach(() => {
    systemUnderTest = new AmbienceBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  //ANF-ID: [ELG0021]
  test("buildViewModel sets the theme in the view model", () => {
    systemUnderTest.theme = ThemeType.Arcade;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]?.theme).toBe(ThemeType.Arcade);
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.buildViewModel();
    const viewMock = mock<AmbienceView>();
    viewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error which the asyncSetup of the view rejects", async () => {
    systemUnderTest.buildViewModel();
    const viewMock = mock<AmbienceView>();
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
