import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarBuilder from "../../../../Core/Presentation/Babylon/Avatar/AvatarBuilder";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import { waitFor } from "@testing-library/react";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("../../../../Core/Presentation/Babylon/Avatar/AvatarController");
const setViewModelMock = jest.spyOn(
  AvatarPresenter.prototype,
  "ViewModel",
  "set"
);

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarBuilder", () => {
  let systemUnderTest: AvatarBuilder;

  beforeEach(() => {
    systemUnderTest = new AvatarBuilder();
  });

  test("buildPresenter builds the AvatarPresenter and sets the ViewModel with its setter", () => {
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeInstanceOf(AvatarPresenter);
    expect(systemUnderTest["presenter"]).toBe(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
    expect(setViewModelMock).toHaveBeenCalledTimes(1);
  });

  test("buildView calls asyncSetup on the view", () => {
    const asyncSetupMock = jest.spyOn(AvatarView.prototype, "asyncSetup");
    systemUnderTest["viewModel"] = mock<AvatarViewModel>();
    systemUnderTest["controller"] = mock<IAvatarController>();

    systemUnderTest.buildView();

    expect(asyncSetupMock).toHaveBeenCalledTimes(1);
  });

  test("isCompleted resolves when asyncSetup of the view resolves", async () => {
    systemUnderTest["viewModel"] = mock<AvatarViewModel>();
    systemUnderTest["controller"] = mock<IAvatarController>();

    jest.spyOn(AvatarView.prototype, "asyncSetup").mockResolvedValue(undefined);

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error when asyncSetup of the view rejects", async () => {
    systemUnderTest["viewModel"] = mock<AvatarViewModel>();
    systemUnderTest["controller"] = mock<IAvatarController>();

    const consoleErrorMock = jest.spyOn(console, "error");

    jest
      .spyOn(AvatarView.prototype, "asyncSetup")
      .mockRejectedValue("Test Error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
});
