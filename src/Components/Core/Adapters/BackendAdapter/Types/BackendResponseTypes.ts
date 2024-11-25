import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

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
