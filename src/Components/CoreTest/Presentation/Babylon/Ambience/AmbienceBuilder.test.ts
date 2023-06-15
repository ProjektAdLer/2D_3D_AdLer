import { mock } from "jest-mock-extended";
import AmbienceBuilder from "../../../../Core/Presentation/Babylon/Ambience/AmbienceBuilder";
import AmbienceView from "../../../../Core/Presentation/Babylon/Ambience/AmbienceView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import { waitFor } from "@testing-library/react";

jest.mock("../../../../Core/Presentation/Babylon/Ambience/AmbienceView");

describe("AmbienceBuilder", () => {
  let systemUnderTest: AmbienceBuilder;

  beforeEach(() => {
    systemUnderTest = new AmbienceBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.buildViewModel();
    const ambienceViewMock = mock<AmbienceView>();
    ambienceViewMock.asyncSetup.mockResolvedValue(undefined);
    systemUnderTest["view"] = ambienceViewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs error the asyncSetup of the view rejects", async () => {
    systemUnderTest.buildViewModel();
    const ambienceViewMock = mock<AmbienceView>();
    ambienceViewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = ambienceViewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
});
