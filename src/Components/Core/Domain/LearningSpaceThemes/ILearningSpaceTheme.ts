import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";

type LearningElementModelsMap = Readonly<
  Record<LearningElementTypes, readonly string[]>
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
}
