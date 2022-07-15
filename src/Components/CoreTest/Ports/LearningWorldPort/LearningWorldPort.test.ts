import { injectable } from "inversify";

import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import {
  LearningElementTO,
  LearningRoomTO,
  LearningWorldTO,
} from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningWorldPort from "../../../Core/Ports/LearningWorldPort/LearningWorldPort";
import LearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import Navigation from "../../../Core/Presentation/Babylon/Navigation/Navigation";
import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import LearningElementsDropdownPresenter from "../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownViewModel";
import ViewModelControllerProvider from "../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const presentLearningRoomMock = jest.spyOn(
  LearningRoomPresenter.prototype,
  "presentLearningRoom"
);

const presentLearningElementsMock = jest.spyOn(
  LearningElementsDropdownPresenter.prototype,
  "presentLearningElements"
);

const registerViewModelOnlyMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerViewModelOnly"
);

const setupNavigationMock = jest.spyOn(Navigation.prototype, "setupNavigation");

@injectable()
//@ts-ignore
class LearningRoomBuilderMock extends PresentationBuilder<
  LearningRoomViewModel,
  undefined,
  undefined,
  LearningRoomPresenter
> {
  constructor() {
    super(LearningRoomViewModel, undefined, undefined, LearningRoomPresenter);
  }
}

describe("LearningWorldPort", () => {
  let systemUnderTest: LearningWorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(BUILDER_TYPES.ILearningRoomBuilder).to(
      LearningRoomBuilderMock
    );

    systemUnderTest = new LearningWorldPort(new ViewModelControllerProvider());
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("LearningElementDropdownPresenter setter sets private member", () => {
    const learningElementDropdownPresenter =
      new LearningElementsDropdownPresenter(
        new LearningElementsDropdownViewModel()
      );
    systemUnderTest.LearningElementDropdownPresenter =
      learningElementDropdownPresenter;
    expect(systemUnderTest["learningElementDropdownPresenter"]).toBe(
      learningElementDropdownPresenter
    );
  });

  test("presentLearningWorld", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      learningElementData: {
        type: "h5p",
      },
      name: "test",
    };
    const learningRoomTO: LearningRoomTO = {
      id: 1,
      learningElements: [learningElementTO],
    };
    const learningWorldTO: LearningWorldTO = {
      worldName: "test",
      learningRooms: [learningRoomTO],
    };

    systemUnderTest.LearningElementDropdownPresenter =
      new LearningElementsDropdownPresenter(
        new LearningElementsDropdownViewModel()
      );

    systemUnderTest.presentLearningWorld(learningWorldTO);

    expect(presentLearningRoomMock).toHaveBeenCalledTimes(1);
    expect(presentLearningRoomMock).toHaveBeenCalledWith(learningRoomTO);

    expect(registerViewModelOnlyMock).toHaveBeenCalledTimes(1);
    expect(registerViewModelOnlyMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      LearningWorldViewModel
    );
    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["viewModel"].worldName.Value).toBe(
      learningWorldTO.worldName
    );
    expect(systemUnderTest["viewModel"].worldNameLoading.Value).toBe(false);

    expect(setupNavigationMock).toHaveBeenCalledTimes(1);

    expect(presentLearningElementsMock).toHaveBeenCalledTimes(1);
  });
});
