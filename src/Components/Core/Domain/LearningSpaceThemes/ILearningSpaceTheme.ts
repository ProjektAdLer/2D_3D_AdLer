import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";

type LearningElementModelsMap = Readonly<
  Record<LearningElementTypes, LearningElementModel[]>
>;

type LearningSpaceDecorationMap = Readonly<
  Record<LearningSpaceTemplateType, string>
>;

export default interface ILearningSpaceTheme {
  readonly wallTexture: string;
  readonly floorTexture: string;
  readonly learningElementModels: LearningElementModelsMap;
  readonly standinDecorationModels: string[];
  readonly entryDoorModel: string;
  readonly exitDoorModel: string;
  readonly windowModel: string;
  readonly ambienceModel: string;
  readonly storyElementModel: LearningElementModel;
  readonly insideDecorationModels: LearningSpaceDecorationMap;
  readonly outsideDecorationModels: LearningSpaceDecorationMap;
}
