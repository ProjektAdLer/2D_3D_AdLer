import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CourseListTO from "../../DataTransferObjects/CourseListTO";
import WorldStatusTO from "../../DataTransferObjects/WorldStatusTO";
import ElementScoreTO from "../../DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../DataTransferObjects/PlayerDataTO";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import { XAPIEvent } from "../../UseCases/ScoreH5PElement/IScoreH5PElementUseCase";

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
  }: ElementDataParams): Promise<ElementScoreTO>;

  getWorldData({
    userToken,
    worldID,
  }: GetWorldDataParams): Promise<Partial<BackendWorldTO>>;

  scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean>;

  getWorldStatus(userToken: string, worldID: number): Promise<WorldStatusTO>;

  scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean>;

  loginUser(userCredentials: UserCredentialParams): Promise<string>;

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string>;
}
