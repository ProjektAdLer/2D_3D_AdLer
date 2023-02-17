import { ComponentID } from "../../Domain/Types/EntityTypes";
import UserCredentials from "./Types/UserCredentials";
import { XAPiEvent } from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import BackendWorldStatusTO from "../../Application/DataTransferObjects/BackendWorldStatusTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";

// TODO: Restructure in meaningful types
export type getWorldDataParams = {
  userToken: string;
  worldID: number;
};

export type ScoreH5PElementRequest = {
  userToken: string;
  h5pID: number;
  courseID: number;
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
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<ElementScoreTO>;

  getWorldData({
    userToken,
    worldID,
  }: getWorldDataParams): Promise<Partial<BackendWorldTO>>;

  scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean>;

  getWorldStatus(
    userToken: string,
    worldID: number
  ): Promise<BackendWorldStatusTO>;

  scoreH5PElement(data: ScoreH5PElementRequest): Promise<boolean>;

  loginUser(userCredentials: UserCredentials): Promise<string>;

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;

  getElementSource(
    userToken: string,
    elementID: number,
    courseID: number
  ): Promise<string>;
}
