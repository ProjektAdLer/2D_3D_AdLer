import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { ComponentID } from "../Types/EntityTypes";
import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import { ThemeType } from "../Types/ThemeTypes";
import LearningElementEntity from "./LearningElementEntity";
import StoryElementEntity from "./StoryElementEntity";

export default class LearningSpaceEntity {
  public id: ComponentID;
  public name: string;
  public elements: (LearningElementEntity | null)[];
  public description: string;
  public goals: string[];
  public requirements: string;
  public requiredScore: number;
  public template: LearningSpaceTemplateType;
  public theme: ThemeType;
  public parentWorldID: ComponentID;
  public storyElements: StoryElementEntity[];
  public gradingStyle: IElementCompletionDisplay;
}
