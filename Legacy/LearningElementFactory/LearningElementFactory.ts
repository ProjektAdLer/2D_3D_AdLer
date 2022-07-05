import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementFactory from "./ILearningElementFactory";
import ILearningElementController from "./ILearningElementController";
import {
  LearningElementType,
  LearningElementTypeSymbols,
} from "./Types/LearningElementTypes";

const modelLinks = {
  [LearningElementTypeSymbols.h5p]: require("../../../../Assets/3DLink_H5P.glb"),
  [LearningElementTypeSymbols.text]: require("../../../../Assets/3DLink_Text.glb"),
  [LearningElementTypeSymbols.image]: require("../../../../Assets/3DLink_Image.glb"),
  [LearningElementTypeSymbols.video]: require("../../../../Assets/3DLink_Video.glb"),
};

@injectable()
export default class LearningElementFactory implements ILearningElementFactory {
  async createLearningElementAsync(
    type: LearningElementType
  ): Promise<ILearningElementController> {
    const learningElementPresenter: ILearningElementController =
      CoreDIContainer.get(CORE_TYPES.ILearingElementPresenter);

    await learningElementPresenter.loadMeshAsync(
      modelLinks[LearningElementTypeSymbols[type]]
    );

    return learningElementPresenter;
  }
}
