import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningSpaceTemplateType } from "../../Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "../../Domain/Types/ThemeTypes";
import {
  BackendAdaptivityElementTO,
  BackendLearningElementTO,
} from "./BackendElementTO";
import BackendStoryTO from "./BackendStoryTO";

/**
 * Data Transfer Object for a Space
 * @class SpaceTO
 * @property {ElementID} id - The ID of the space
 * @property {string} name - The name of the space
 * @property {(BackendElementTO | null)[]} elements - The elements of the space, in slot order
 * @property {string} description - The description of the space
 * @property {string} goals - The learning goals of the space
 * @property {string} requirements - Boolean algebra containing the requirements to complete this space
 * @property {number} requiredScore - The required score to complete this space
 * @property {string} template - The template describing the structure of the space
 * @property {string} templateStyle - The template style of the space
 */
export default class BackendSpaceTO {
  id: ComponentID;
  name: string;
  elements: (BackendLearningElementTO | BackendAdaptivityElementTO | null)[];
  description: string;
  goals: string[];
  requirements: string;
  requiredScore: number;
  template: LearningSpaceTemplateType;
  templateStyle: ThemeType;
  introStory: BackendStoryTO | null;
  outroStory: BackendStoryTO | null;
}
