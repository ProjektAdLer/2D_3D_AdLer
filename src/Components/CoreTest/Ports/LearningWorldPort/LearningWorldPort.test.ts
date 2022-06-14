import { injectable } from "inversify";
import {
  LearningElementTO,
  LearningRoomTO,
  LearningWorldTO,
} from "../../../Core/Application/LoadWorld/ILearningWorldPort";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import LearningWorldPort from "../../../Core/Ports/LearningWorldPort/LearningWorldPort";
import LearningWorldViewModel from "../../../Core/Ports/LearningWorldPort/LearningWorldViewModel";
import LearningRoomBuilder from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import LearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import Navigation from "../../../Core/Presentation/Babylon/Navigation/Navigation";
import ScenePresenter from "../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";
import IPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
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
  let learningWorldPort: LearningWorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(BUILDER_TYPES.ILearningRoomBuilder);
    CoreDIContainer.bind<IPresentationBuilder>(
      BUILDER_TYPES.ILearningRoomBuilder
    ).to(LearningRoomBuilderMock);

    learningWorldPort = new LearningWorldPort(
      new ViewModelControllerProvider()
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("LearningElementDropdownPresenter setter sets private member", () => {
    const learningElementDropdownPresenter =
      new LearningElementsDropdownPresenter(
        new LearningElementsDropdownViewModel()
      );
    learningWorldPort.LearningElementDropdownPresenter =
      learningElementDropdownPresenter;
    expect(learningWorldPort["learningElementDropdownPresenter"]).toBe(
      learningElementDropdownPresenter
    );
  });

  test("presentLearningWorld", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      type: "h5p",
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

    learningWorldPort.LearningElementDropdownPresenter =
      new LearningElementsDropdownPresenter(
        new LearningElementsDropdownViewModel()
      );

    learningWorldPort.presentLearningWorld(learningWorldTO);

    expect(presentLearningRoomMock).toHaveBeenCalledTimes(1);
    expect(presentLearningRoomMock).toHaveBeenCalledWith(learningRoomTO);

    expect(registerViewModelOnlyMock).toHaveBeenCalledTimes(1);
    expect(registerViewModelOnlyMock).toHaveBeenCalledWith(
      learningWorldPort["viewModel"],
      LearningWorldViewModel
    );
    expect(learningWorldPort["viewModel"]).toBeDefined();
    expect(learningWorldPort["viewModel"].worldName.Value).toBe(
      learningWorldTO.worldName
    );
    expect(learningWorldPort["viewModel"].worldNameLoading.Value).toBe(false);

    expect(setupNavigationMock).toHaveBeenCalledTimes(1);

    expect(presentLearningElementsMock).toHaveBeenCalledTimes(1);
  });
});
