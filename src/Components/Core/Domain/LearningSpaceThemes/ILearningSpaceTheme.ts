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
  readonly learningElementModels: LearningElementModelsMap;
  readonly ambienceModel: string;
  readonly entryDoorModel: string;
  readonly exitDoorModel: string;
  readonly storyElementModel: LearningElementModel;
  readonly wallTexture?: string;
  readonly floorTexture?: string;
  readonly windowModel?: string;
  readonly standinDecorationModels?: string[];
  readonly insideDecorationModels?: LearningSpaceDecorationMap;
  readonly outsideDecorationModels?: LearningSpaceDecorationMap;
}
