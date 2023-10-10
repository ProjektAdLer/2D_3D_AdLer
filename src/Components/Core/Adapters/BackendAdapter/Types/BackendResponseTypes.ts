import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export type PlayerDataResponse = {
  playerGender: string;
  playerWorldColor: string;
};

export type ElementScoreResponse = {
  elementID: number;
  success: boolean;
};

export type CoursesAvailableForUserResponse = {
  worlds: { worldId: number; worldName: string }[];
};

export default class WorldStatusResponse {
  worldId: ComponentID;
  elements: {
    elementId: ComponentID;
    success: boolean;
  }[];
}

export class AdaptivityElementBackendQuestionResponse {
  elementScore: {
    elementId: number;
    success: boolean;
  };
  gradedTask: {
    taskId: number;
    taskStatus: string;
  };
  gradedQuestion: {
    id: number;
    status: string;
    answer:
      | [
          {
            checked: boolean;
            correct: boolean;
          }
        ]
      | undefined;
  };
}
