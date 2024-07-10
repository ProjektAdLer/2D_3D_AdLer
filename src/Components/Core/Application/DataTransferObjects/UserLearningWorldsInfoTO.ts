import { ComponentID } from "../../Domain/Types/EntityTypes";

export default class UserLearningWorldsInfoTO {
  worldInfo: { worldID: number; worldName: string; isCompleted: boolean }[];
  lastVisitedWorldID: ComponentID | undefined;
}
