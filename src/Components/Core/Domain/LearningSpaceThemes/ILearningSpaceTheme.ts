import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";

type LearningElementModelsMap = Readonly<
  Record<LearningElementTypes, LearningElementModel[]>
>;

export default interface ILearningSpaceTheme {
  readonly name: LearningSpaceThemeType;
  readonly wallTexture: string;
  readonly floorTexture: string;
  readonly learningElementModels: LearningElementModelsMap;
  readonly standinDecorationModels: string[];
  readonly entryDoorModel: string;
  readonly exitDoorModel: string;
  readonly windowModel: string;
  readonly ambienceModel: string;
  readonly storyElementModel: LearningElementModel;
  readonly modelLinkLShape: string;
  readonly modelLink2x2: string;
  readonly modelLink2x3: string;
}
