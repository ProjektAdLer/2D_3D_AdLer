import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementFactory from "./ILearningElementFactory";
import ILearningElementPresenter from "./ILearningElementPresenter";
import { LearningElementTypes } from "./Types/LearningElementTypes";

import link_h5p from "../../../../Assets/3DLink_H5P_fixed.glb";

@injectable()
export default class LearningElementFactory implements ILearningElementFactory {
  async createLearningElementAsync(
    type: LearningElementTypes
  ): Promise<ILearningElementPresenter> {
    const learningElementPresenter: ILearningElementPresenter =
      CoreDIContainer.get(CORE_TYPES.ILearingElementPresenter);

    // TODO: make this generic for all types -MK
    await learningElementPresenter.loadMeshAsync(link_h5p);

    return learningElementPresenter;
  }
}
