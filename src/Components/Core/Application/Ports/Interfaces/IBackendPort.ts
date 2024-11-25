import { ComponentID } from "../../../Domain/Types/EntityTypes";
import CourseListTO from "../../DataTransferObjects/CourseListTO";
import LearningWorldStatusTO from "../../DataTransferObjects/LearningWorldStatusTO";
import LearningElementScoreTO from "../../DataTransferObjects/LearningElementScoreTO";
import BackendWorldTO from "../../DataTransferObjects/BackendWorldTO";
import { XAPIEvent } from "../../UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import AdaptivityElementQuestionSubmissionTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementQuestionResponse from "src/Components/Core/Adapters/BackendAdapter/Types/AdaptivityElementQuestionResponse";
import AdaptivtyElementStatusResponse from "../../../Adapters/BackendAdapter/Types/AdaptivityElementStatusResponse";

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
    courseID: ComponentID,
  ): Promise<boolean>;

  getWorldStatus(
    userToken: string,
    worldID: number,
  ): Promise<LearningWorldStatusTO>;

  scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean>;

  loginUser(userCredentials: UserCredentialParams): Promise<string>;

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string>;

  getAdaptivityElementQuestionResponse(
    userToken: string,
    worldID: number,
    submissionData: AdaptivityElementQuestionSubmissionTO,
  ): Promise<AdaptivityElementQuestionResponse>;

  getAdaptivityElementStatusResponse({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<AdaptivtyElementStatusResponse>;
}
