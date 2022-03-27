import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementFactory from "./ILearningElementFactory";
import ILearningElementPresenter from "./ILearningElementPresenter";
import { LearningElementTypes } from "./Types/LearningElementTypes";

const modelLinks = {
  h5p: "../../../../Assets/3DLink_H5P.glb",
  text: "../../../../Assets/3DLink_Text.glb",
  image: "../../../../Assets/3DLink_Image.glb",
  video: "../../../../Assets/3DLink_Video.glb",
};

@injectable()
export default class LearningElementFactory implements ILearningElementFactory {
  async createLearningElementAsync(
    type: LearningElementTypes
  ): Promise<ILearningElementPresenter> {
    const learningElementPresenter: ILearningElementPresenter =
      CoreDIContainer.get(CORE_TYPES.ILearingElementPresenter);

    await learningElementPresenter.loadMeshAsync(modelLinks[type]);

    return learningElementPresenter;
  }
}
