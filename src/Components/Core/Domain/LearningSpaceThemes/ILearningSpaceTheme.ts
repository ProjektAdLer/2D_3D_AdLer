import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";

type LearningElementModelsMap = Readonly<
  Record<LearningElementTypes, LearningElementModel[]>
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
  readonly decorationModelLinkLShape: string;
  readonly decorationModelLinkTShape: string;
  readonly decorationModelLinkDShape: string;
  readonly decorationModelLink2x2: string;
  readonly decorationModelLink2x3: string;
  readonly decorationModelLinkTShape: string;
}
