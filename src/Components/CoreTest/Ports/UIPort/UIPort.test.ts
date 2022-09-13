import UIPort from "../../../Core/Ports/UIPort/UIPort";
import CoreDIContainer from "../../../../Components/Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import IModalManagerPresenter from "../../../Core/Presentation/React/LearningRoomDisplay/ModalManager/IModalManagerPresenter";
import IBottomTooltipPresenter from "../../../Core/Presentation/React/LearningRoomDisplay/BottomTooltip/IBottomTooltipPresenter";
import { LearningElementTO } from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import { logger } from "../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

describe("UIPort", () => {
  let systemUnderTest: UIPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(UIPort);
  });

  test("displayModal throws error if MoodleLoginFormPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.displayModal("error message", "error");
    }).toThrowError("ModalManagerPresenter is not registered");
  });

  test("displayModal calls the ModalManagerPresenter with given message and notification type", () => {
    const mockModalManagerPresenterMock = mock<IModalManagerPresenter>();
    systemUnderTest.registerModalManager(mockModalManagerPresenterMock);

    systemUnderTest.displayModal("error message", "error");

    expect(
      mockModalManagerPresenterMock.presentErrorMessage
    ).toHaveBeenCalledTimes(1);
    expect(
      mockModalManagerPresenterMock.presentErrorMessage
    ).toHaveBeenCalledWith("error message", "error");
  });

  test("hideBottomTooltip throws error if BottomTooltipPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.hideBottomTooltip();
    }).toThrowError("BottomTooltipPresenter not registered");
  });

  test("hideBottomTooltip calls the BottomTooltipPresenter hide method", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    systemUnderTest.hideBottomTooltip();

    expect(mockBottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("displayLearningElementTooltip throws error if BottomTooltipPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.displayLearningElementTooltip({});
    }).toThrowError("BottomTooltipPresenter not registered");
  });

  test("displayLearningElementTooltip calls the BottomTooltipPresenter displayLearningElement method", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );
    const LearningElementTO: LearningElementTO = {
      id: 42,
      name: "name",
      learningElementData: {
        type: "h5p",
      },
    };

    systemUnderTest.displayLearningElementTooltip(LearningElementTO);

    expect(
      mockBottomTooltipPresenterMock.displayLearningElement
    ).toHaveBeenCalledTimes(1);
    expect(
      mockBottomTooltipPresenterMock.displayLearningElement
    ).toHaveBeenCalledWith(LearningElementTO);
  });

  test("registerBottomTooltipPresenter registeres the presenter if none is present", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    expect(systemUnderTest["bottomTooltipPresenter"]).toBe(
      mockBottomTooltipPresenterMock
    );
  });

  test("registerBottomTooltipPresenter warns if BottomTooltipPresenter is already registered", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("registerModalManager registers the presenter if none is present", () => {
    const mockModalManagerPresenterMock = mock<IModalManagerPresenter>();

    systemUnderTest.registerModalManager(mockModalManagerPresenterMock);

    expect(systemUnderTest["modalManagerPresenter"]).toBe(
      mockModalManagerPresenterMock
    );
  });

  test("registerModalManager throws error if ModalManagerPresenter is already registered", () => {
    const mockModalManagerPresenterMock = mock<IModalManagerPresenter>();
    systemUnderTest.registerModalManager(mockModalManagerPresenterMock);
    systemUnderTest.registerModalManager(mockModalManagerPresenterMock);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
});
