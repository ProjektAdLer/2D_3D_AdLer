import { ComponentID } from "../../../Domain/Types/EntityTypes";
import UserCredentials from "../../../Adapters/BackendAdapter/Types/UserCredentials";
import CourseListTO from "../../DataTransferObjects/CourseListTO";
import BackendWorldStatusTO from "../../DataTransferObjects/BackendWorldStatusTO";
import ElementScoreTO from "../../DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../DataTransferObjects/PlayerDataTO";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import { XAPIEvent } from "../../UseCases/ScoreH5PElement/IScoreH5PElementUseCase";

// TODO: Restructure in meaningful types
export type getWorldDataParams = {
  userToken: string;
  worldID: number;
};

export type ScoreH5PElementRequest = {
  userToken: string;
  h5pID: number;
  courseID: number;
  rawH5PEvent: XAPIEvent;
};

export default interface IBackendPort {
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
