import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CourseListTO from "../../DataTransferObjects/CourseListTO";
import LearningWorldStatusTO from "../../DataTransferObjects/LearningWorldStatusTO";
import LearningElementScoreTO from "../../DataTransferObjects/LearningElementScoreTO";
import PlayerDataTO from "../../DataTransferObjects/PlayerDataTO";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import { XAPIEvent } from "../../UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";

export type GetWorldDataParams = {
  userToken: string;
  worldID: number;
};

export type ScoreH5PElementParams = {
  userToken: string;
  h5pID: number;
  courseID: number;
  rawH5PEvent: XAPIEvent;
};

export type UserCredentialParams = {
  username: string;
  password: string;
};

export type ElementDataParams = {
  userToken: string;
  elementID: ComponentID;
  worldID: ComponentID;
};

export default interface IBackendPort {
  deletePlayerData(userToken: string): Promise<boolean>;

  updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO>;

  getPlayerData(userToken: string): Promise<PlayerDataTO>;

  getElementScore({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<LearningElementScoreTO>;

  getWorldData({
    userToken,
    worldID,
  }: GetWorldDataParams): Promise<BackendWorldTO>;

  scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean>;

  getWorldStatus(
    userToken: string,
    worldID: number
  ): Promise<LearningWorldStatusTO>;

  scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean>;

  loginUser(userCredentials: UserCredentialParams): Promise<string>;

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string>;
}
