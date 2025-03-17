// these types define the JSON data structure of the AWT that is returned by the backend

export interface AWT {
  fileVersion: string;
  amgVersion?: string;
  author?: string;
  language?: string;
  world: APIWorld;
}

export interface APIWorld {
  worldName: string;
  worldDescription?: string;
  worldGoals?: string[];
  topics: APITopic[];
  spaces: APISpace[];
  elements: APIElement[];
  evaluationLink?: string;
  frameStory?: APIFrameStory;
  theme?: string;
}

export interface APITopic {
  topicId: number;
  topicName: string;
  topicContents: number[];
}

type SpaceSlotItem = number | null;

export interface APISpace {
  spaceId: number;
  spaceName: string;
  spaceDescription?: string;
  spaceGoals?: string[];
  spaceSlotContents: SpaceSlotItem[];
  requiredPointsToComplete: number;
  requiredSpacesToEnter: string;
  spaceTemplate: string;
  spaceTemplateStyle: string;
  spaceStory: {
    introStory: APIStoryElement | null;
    outroStory: APIStoryElement | null;
  };
}

export interface APIStoryElement {
  storyTexts: string[];
  elementModel: string;
}

export interface APIElement {
  $type: string;
  elementId: number;
  elementName: string;
  elementDescription?: string;
  elementGoals?: string[];
  elementCategory: string;
  elementFileType: string;
  elementMaxScore?: number;
  elementModel?: string;
  adaptivityContent?: APIAdaptivity;
}

export interface APIAdaptivity {
  introText: string;
  adaptivityTasks: APIAdaptivityTask[];
}

export interface APIAdaptivityTask {
  taskId: number;
  taskTitle: string;
  optional?: boolean;
  requiredDifficulty?: number;
  adaptivityQuestions: APIAdaptivityQuestion[];
}

export interface APIAdaptivityQuestion {
  questionType: string;
  questionId: number;
  questionDifficulty: number;
  questionText: string;
  choices: APIAdaptivityAnswers[];
  adaptivityRules: APIAdaptivityTrigger[];
}

export interface APIAdaptivityAnswers {
  answerText?: string;
  answerImage?: string;
}

export interface APIAdaptivityTrigger {
  triggerId: number;
  triggerCondition: string;
  adaptivityAction: APIAdaptivityAction;
}

export interface APIAdaptivityAction {
  $type: string;
  commentText?: string;
  elementId?: number;
  hintText?: string | null;
}

export interface APIFrameStory {
  frameStoryIntro: string;
  frameStoryOutro: string;
}

export default AWT;
