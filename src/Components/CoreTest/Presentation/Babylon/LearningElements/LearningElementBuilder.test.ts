import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementPresenter";
import LearningElementTO from "../../../../Core/Application/DataTransferObjects/LearningElementTO";
import { Vector3 } from "@babylonjs/core";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementView";
import { waitFor } from "@testing-library/react";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarFocusSelection from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFokusSelection";

jest.mock(
  "../../../../Core/Presentation/Babylon/LearningElements/LearningElementView",
);

const worldPortMock = mock<ILearningWorldPort>();
const avatarFocusSelectionMock = mock<IAvatarFocusSelection>();

const mockElementData: LearningElementTO = {
  id: 0,
  value: 0,
  parentSpaceID: 0,
  parentWorldID: 0,
  name: "TestName",
  description: "TestDescription",
  goals: ["TestGoal"],
  type: "h5p",
  hasScored: false,
  model: LearningElementModelTypeEnums.H5pElementModelTypes.GreySlotmachine,
  theme: LearningSpaceThemeType.Campus,
  isScoreable: false,
  difficulty: {
    difficultyType: 0,
    multiplicator: 1,
    baseXP: 10,
  },
};
const mockElementPosition: [Vector3, number] = [new Vector3(1, 2, 3), 0];

describe("LearningElementBuilder", () => {
  let systemUnderTest: LearningElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mock());
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    ).toConstantValue(avatarFocusSelectionMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceDisplay);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildViewModel throws if elementData is not set", () => {
    systemUnderTest.elementPosition = mockElementPosition;
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrow("elementData is undefined");
  });

  test("buildViewModel throws if elementPosition is not set", () => {
    systemUnderTest.elementData = mockElementData;
    expect(() => {
      systemUnderTest.buildViewModel();
    }).toThrowError("elementPosition is undefined");
  });

  // ANF-ID: [ELG0028, EZZ0034]
  test("buildViewModel concludes the build step successfully and sets the given data in the viewModel", () => {
    systemUnderTest.elementData = mockElementData;
    systemUnderTest.elementPosition = mockElementPosition;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["viewModel"]!.id).toBe(mockElementData.id);
    expect(systemUnderTest["viewModel"]!.name).toBe(mockElementData.name);
    expect(systemUnderTest["viewModel"]!.description).toBe(
      mockElementData.description,
    );
    expect(systemUnderTest["viewModel"]!.goals).toBe(mockElementData.goals);
    expect(systemUnderTest["viewModel"]!.type).toBe(mockElementData.type);
    expect(systemUnderTest["viewModel"]!.hasScored.Value).toBe(
      mockElementData.hasScored,
    );
    expect(systemUnderTest["viewModel"]!.difficulty).toBe(
      mockElementData.difficulty,
    );
    expect(systemUnderTest["viewModel"]!.modelType).toBe(mockElementData.model);
    expect(systemUnderTest["viewModel"]!.value).toBe(mockElementData.value);
    expect(systemUnderTest["viewModel"]!.position).toBe(mockElementPosition[0]);
    expect(systemUnderTest["viewModel"]!.rotation).toBe(mockElementPosition[1]);
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.elementData = mockElementData;
    systemUnderTest.elementPosition = mockElementPosition;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    // build results
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(
      LearningElementPresenter,
    );

    // call to the element port
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope._sceneRendering,
    );
  });

  test("buildPresenter registers presenter with the avatarFocusSelection", () => {
    systemUnderTest.elementData = mockElementData;
    systemUnderTest.elementPosition = mockElementPosition;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(avatarFocusSelectionMock.registerFocusable).toHaveBeenCalledTimes(1);
    expect(avatarFocusSelectionMock.registerFocusable).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
    );
  });

  test("buildView calls setupLearningElement on the created view and resolves", async () => {
    systemUnderTest.elementData = mockElementData;
    systemUnderTest.elementPosition = mockElementPosition;
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    const viewMock = mock<LearningElementView>();
    viewMock.setupLearningElement.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    expect(systemUnderTest["view"]).toBeDefined();
    expect(systemUnderTest["view"]!.setupLearningElement).toHaveBeenCalledTimes(
      1,
    );
    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error which setupLearningElement of the view rejects", async () => {
    systemUnderTest.elementData = mockElementData;
    systemUnderTest.elementPosition = mockElementPosition;
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewMock = mock<LearningElementView>();
    viewMock.setupLearningElement.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
});
