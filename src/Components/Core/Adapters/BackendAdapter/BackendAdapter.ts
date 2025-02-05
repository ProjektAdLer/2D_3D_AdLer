import { BackendAvatarConfigTO } from "./../../Application/DataTransferObjects/BackendAvatarConfigTO";
import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import AWT from "./Types/AWT";
import IBackendPort, {
  ElementDataParams,
  GetWorldDataParams,
  ScoreH5PElementParams,
  UserCredentialParams,
} from "../../Application/Ports/Interfaces/IBackendPort";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningElementScoreTO from "../../Application/DataTransferObjects/LearningElementScoreTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import BackendAdapterUtils from "./BackendAdapterUtils";
import WorldStatusResponse, {
  CoursesAvailableForUserResponse,
  ElementScoreResponse,
} from "./Types/BackendResponseTypes";
import LearningWorldStatusTO from "../../Application/DataTransferObjects/LearningWorldStatusTO";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import { LogLevelTypes } from "../../Domain/Types/LogLevelTypes";
import AdaptivityElementQuestionSubmissionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementQuestionResponse from "./Types/AdaptivityElementQuestionResponse";
import AdaptivtyElementStatusResponse from "./Types/AdaptivityElementStatusResponse";

@injectable()
export default class BackendAdapter implements IBackendPort {
  constructor() {
    const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
    try {
      axios.defaults.baseURL = new URL(config.serverURL).toString();
    } catch (error) {
      logger.log(
        LogLevelTypes.ERROR,
        "Could not set Axios Base URL to: " + config.serverURL,
      );
      if (config.isDebug)
        logger.log(
          LogLevelTypes.DEBUG,
          "If you want to use the Fake Backend, set the environment variable REACT_APP_USE_FAKEBACKEND to true.",
        );
      throw error;
    }

    // set default timeout for axios
    axios.defaults.timeout = 3000;
  }

  async getElementScore({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<LearningElementScoreTO> {
    const resp = await axios.get<ElementScoreResponse>(
      "/Elements/World/" + worldID + "/Element/" + elementID + "/Score",
      {
        headers: {
          token: userToken,
        },
      },
    );

    return resp.data as LearningElementScoreTO;
  }

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string> {
    return axios
      .get<{ filePath: string }>(
        "/Elements/FilePath/World/" + worldID + "/Element/" + elementID,
        {
          headers: {
            token: userToken,
          },
        },
      )
      .then((response) => response.data.filePath);
  }

  async scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean> {
    const response = await axios.patch<{
      isSuccess: true;
    }>(
      "/Elements/World/" + data.courseID + "/Element/" + data.h5pID,
      {
        serializedXAPIEvent: JSON.stringify(data.rawH5PEvent),
      },
      {
        headers: {
          token: data.userToken,
        },
      },
    );

    return response.data.isSuccess;
  }

  async scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID,
  ): Promise<boolean> {
    const response = await axios.patch<{
      isSuccess: boolean;
    }>(
      "/Elements/World/" + courseID + "/Element/" + elementID,
      {},
      {
        headers: {
          token: userToken,
        },
      },
    );

    return response.data.isSuccess;
  }

  async getWorldStatus(
    userToken: string,
    worldID: number,
  ): Promise<LearningWorldStatusTO> {
    const resp = await axios.get<WorldStatusResponse>(
      "/Worlds/" + worldID + "/status",
      {
        headers: {
          token: userToken,
        },
      },
    );

    const worldStatusTO = new LearningWorldStatusTO();
    worldStatusTO.worldID = worldID;
    worldStatusTO.elements = resp.data.elements.map((element) => ({
      elementID: element.elementId,
      hasScored: element.success,
    }));

    return worldStatusTO;
  }

  async getWorldData({
    userToken,
    worldID,
  }: GetWorldDataParams): Promise<BackendWorldTO> {
    const response = await axios.get<AWT>("/Worlds/" + worldID, {
      headers: {
        token: userToken,
      },
    });

    return BackendAdapterUtils.parseAWT(response.data);
  }

  async getCoursesAvailableForUser(userToken: string) {
    const response = await axios
      .get<CoursesAvailableForUserResponse>("/Worlds", {
        headers: {
          token: userToken,
        },
      })
      .then((response) =>
        response.data.worlds.map((world) => ({
          courseID: world.worldId,
          courseName: world.worldName,
        })),
      );

    const courseListTO = new CourseListTO();
    courseListTO.courses = response;
    return courseListTO;
  }

  async loginUser(userCredentials: UserCredentialParams): Promise<string> {
    const token = await axios.post<{
      lmsToken: string;
    }>("/Users/Login", {
      UserName: userCredentials.username,
      Password: userCredentials.password,
    });

    return token.data.lmsToken;
  }

  async getAdaptivityElementQuestionResponse(
    userToken: string,
    worldID: number,
    submissionData: AdaptivityElementQuestionSubmissionTO,
  ): Promise<AdaptivityElementQuestionResponse> {
    const response = await axios.patch<AdaptivityElementQuestionResponse>(
      "/Elements/World/" +
        worldID +
        "/Element/" +
        submissionData.elementID +
        "/Question/" +
        submissionData.questionID,
      submissionData.selectedAnswers,
      {
        headers: {
          token: userToken,
        },
      },
    );
    return response.data;
  }

  async getAdaptivityElementStatusResponse({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<AdaptivtyElementStatusResponse> {
    const response = await axios.get<AdaptivtyElementStatusResponse>(
      "/Elements/World/" + worldID + "/Element/" + elementID + "/Adaptivity",
      {
        headers: {
          token: userToken,
        },
      },
    );
    return response.data;
  }

  async getAvatarConfig(userToken: string): Promise<BackendAvatarConfigTO> {
    const response = await axios.get<BackendAvatarConfigTO>("/Player/Avatar", {
      headers: {
        token: userToken,
      },
    });

    return response.data;
  }

  async updateAvatarConfig(
    userToken: string,
    avatarConfig: BackendAvatarConfigTO,
  ): Promise<boolean> {
    console.log("UPDATE CONFIG", avatarConfig);
    const response = await axios.post<boolean>("/Player/Avatar", avatarConfig, {
      headers: {
        token: userToken,
      },
    });

    return response.data;
  }
}
