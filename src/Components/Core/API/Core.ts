import { inject, injectable } from "inversify";
import IPresentation from "../Presentation/API/IPresentation";
import ICore from "./ICore";
import IBusinessLogic from "../Presentation/API/IBusinessLogic";
import CORE_TYPES from "../DependencyInjection/CoreTypes";
import { H5PForCoursesAPIResponse } from "../Types/H5PTypes";
import CoreDIContainer from "../DependencyInjection/CoreDIContainer";
import IEntityManager from "../BusinessLogic/EntityManager/IEntityManager";
import REACT_TYPES from "../../React/DependencyInjection/ReactTypes";
import ILearningElementFactory from "../Presentation/LearningElement/ILearningElementFactory";
import { ActionManager } from "@babylonjs/core";
import IRoomFactory from "../Presentation/Room/IRoomFactory";

@injectable()
export default class Core implements ICore {
  presentation: IPresentation;
  businessLogic: IBusinessLogic;
  public constructor(
    @inject(CORE_TYPES.IPresentation) presentation: IPresentation
  ) {
    this.presentation = presentation;
    this.businessLogic = presentation.BusinessLogic;
    console.log("Core created");
  }

  async getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse> {
    return await this.businessLogic.getAllH5Ps(courseId);
  }

  async setupMoodle(): Promise<void> {
    this.businessLogic.setupMoodle();
  }

  async setupBabylon(canvas: HTMLCanvasElement): Promise<void> {
    await this.presentation.setupBabylon(canvas);

    // room setup
    let roomFactory = CoreDIContainer.get<IRoomFactory>(
      CORE_TYPES.IRoomFactory
    );
    let leFactory = CoreDIContainer.get<ILearningElementFactory>(
      CORE_TYPES.ILearningElementFactory
    );

    let roomPresenter = roomFactory.createRoom();

    let elemCount = 10;
    let lePositions = roomPresenter.getLearningElementPositions(elemCount);
    for (let i = 0; i < elemCount; i++) {
      let le = await leFactory.createLearningElementAsync(
        "h5p",
        lePositions[0][i],
        lePositions[1][i]
      );
      le.registerAction(ActionManager.OnPickTrigger, () => {
        const entityManager = CoreDIContainer.get<IEntityManager>(
          REACT_TYPES.IEntityManager
        );
        entityManager.setH5PData(i + 1);
        entityManager.setShowH5P(true);
      });
    }
  }
}
