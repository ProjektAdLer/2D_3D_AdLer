import { fireEvent, render } from "@testing-library/react";
import SettingContent from "../../../../Core/Presentation/React/Settings/SettingContent";
import React from "react";
import { mock } from "jest-mock-extended";
import SettingContentViewModel from "../../../../Core/Presentation/React/Settings/SettingContentViewModel";
import SettingContentController from "../../../../Core/Presentation/React/Settings/SettingContentController";
import useBuilderMock from "../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const viewModelMock = new SettingContentViewModel();
const controllerMock = mock<SettingContentController>();

describe("SettingContent", () => {
  beforeEach(() => {
    viewModelMock.breakTimeNotificationsEnabled.Value = true;
    viewModelMock.highGraphicsQualityEnabled.Value = true;
    viewModelMock.language.Value = "en";
    viewModelMock.volume.Value = 50;
    viewModelMock.changedSettings = false;
  });

  test("should render", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
  });
  test("should call controller if breakTimeNotif Button is pressed while empty,", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const breakTimeNotificationButton = componentUnderTest.getByTestId(
      "emptyBoxBreakTimeNotifications",
    );
    fireEvent.click(breakTimeNotificationButton);
    expect(
      controllerMock.onBreakTimeNotificationsButtonClicked,
    ).toHaveBeenCalled();
  });
  test("should call controller if breakTimeNotif Button is pressed while ticked,", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const breakTimeNotificationButton = componentUnderTest.getByTestId(
      "checkMarkBreakTimeNotifications",
    );
    fireEvent.click(breakTimeNotificationButton);
    expect(
      controllerMock.onBreakTimeNotificationsButtonClicked,
    ).toHaveBeenCalled();
  });
  test("should call controller if graphicsQuality Button is pressed while empty,", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const graphicsQualityButton = componentUnderTest.getByTestId(
      "emptyBoxGraphicsQuality",
    );
    fireEvent.click(graphicsQualityButton);
    expect(controllerMock.onGraphicsQualityButtonClicked).toHaveBeenCalled();
  });
  test("should call controller if graphicsQuality Button is pressed while ticked,", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const graphicsQualityButton = componentUnderTest.getByTestId(
      "checkMarkGraphicsQuality",
    );
    fireEvent.click(graphicsQualityButton);
    expect(controllerMock.onGraphicsQualityButtonClicked).toHaveBeenCalled();
  });

  test("should call controller if german Button is pressed", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const germanButton = componentUnderTest.getByTestId("germanButton");
    fireEvent.click(germanButton);
    expect(controllerMock.onGermanButtonClicked).toHaveBeenCalled();
  });
  test("should call controller if english Button is pressed", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const englishButton = componentUnderTest.getByTestId("englishButton");
    fireEvent.click(englishButton);
    expect(controllerMock.onEnglishButtonClicked).toHaveBeenCalled();
  });
  test("should call controller if test sound button is clicked", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<SettingContent />);
    const testSoundButton = componentUnderTest.getByTestId("testSoundButton");
    fireEvent.click(testSoundButton);
    expect(controllerMock.onTestSoundButtonClicked).toHaveBeenCalled();
  });
});
