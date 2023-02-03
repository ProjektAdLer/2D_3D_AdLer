import { ElementID } from "../../Domain/Types/EntityTypes";
import UserCredentials from "./Types/UserCredentials";
import { XAPiEvent } from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import WorldStatusTO from "../../Application/DataTransferObjects/WorldStatusTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";

// TODO: Restructure in meaningful types
export type getWorldDataParams = {
  userToken: string;
  worldId: number;
};

export type ScoreH5PElementRequest = {
  userToken: string;
  h5pId: number;
  courseId: number;
  rawH5PEvent: XAPiEvent;
};

export default interface IBackendAdapter {
  deletePlayerData(userToken: string): Promise<boolean>;

  updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO>;

  getPlayerData(userToken: string): Promise<PlayerDataTO>;

  getElementScore(
    userToken: string,
    elementId: ElementID,
    courseId: ElementID
  ): Promise<ElementScoreTO>;

  getWorldData({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<Partial<BackendWorldTO>>;

  scoreElement(
    userToken: string,
    elementId: ElementID,
    courseId: ElementID
  ): Promise<boolean>;

  getWorldStatus(userToken: string, worldId: number): Promise<WorldStatusTO>;

  scoreH5PElement(data: ScoreH5PElementRequest): Promise<boolean>;

  loginUser(userCredentials: UserCredentials): Promise<string>;

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;

  getElementSource(
    userToken: string,
    elementId: number,
    courseId: number
  ): Promise<string>;
}
