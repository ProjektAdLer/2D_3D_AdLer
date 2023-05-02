import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import IDSL from "./Types/IDSL";
import IBackendPort, {
  ElementDataParams,
  GetWorldDataParams,
  ScoreH5PElementParams,
  UserCredentialParams,
} from "../../Application/Ports/Interfaces/IBackendPort";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningElementScoreTO from "../../Application/DataTransferObjects/LearningElementScoreTO";
import { createPatch } from "rfc6902";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import BackendAdapterUtils from "./BackendAdapterUtils";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import WorldStatusResponse, {
  CoursesAvailableForUserResponse,
  ElementScoreResponse,
  PlayerDataResponse,
} from "./Types/BackendResponseTypes";
import LearningWorldStatusTO from "../../Application/DataTransferObjects/LearningWorldStatusTO";
import { logger } from "src/Lib/Logger";

@injectable()
export default class BackendAdapter implements IBackendPort {
  /**
   *
   */
  constructor() {
    try {
      axios.defaults.baseURL = new URL(config.serverURL).toString();
    } catch (error) {
      console.error("Could not set Axios Base URL to: " + config.serverURL);
      if (config.isDebug)
        logger.log(
          "If you want to use the Fake Backend, set the environment variable REACT_APP_USE_FAKEBACKEND to true."
        );
      throw error;
    }

    // set default timeout for axios
    axios.defaults.timeout = 3000;
  }
  async deletePlayerData(userToken: string): Promise<boolean> {
    const isSuceess = await axios.delete<boolean>("/PlayerData", {
      headers: {
        token: userToken,
      },
    });

    return isSuceess.data;
  }

  async updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO> {
    const patchRequest = createPatch({}, playerData);

    const resp = await axios.patch<PlayerDataResponse>(
      "/PlayerData",
      patchRequest,
      {
        headers: {
          token: userToken,
        },
      }
    );

    return resp.data;
  }

  async getPlayerData(userToken: string): Promise<PlayerDataTO> {
    const resp = await axios.get<PlayerDataResponse>("/PlayerData", {
      headers: {
        token: userToken,
      },
    });

    return resp.data as PlayerDataTO;
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
      }
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
        }
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
      }
    );

    return response.data.isSuccess;
  }

  async scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean> {
    const response = await axios.patch<{
      isSuceess: boolean;
    }>(
      "/Elements/World/" + courseID + "/Element/" + elementID,
      {},
      {
        headers: {
          token: userToken,
        },
      }
    );

    return response.data.isSuceess;
  }

  async getWorldStatus(
    userToken: string,
    worldID: number
  ): Promise<LearningWorldStatusTO> {
    const resp = await axios.get<WorldStatusResponse>(
      "/Worlds/" + worldID + "/status",
      {
        headers: {
          token: userToken,
        },
      }
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
    const response = await axios.get<IDSL>("/Worlds/" + worldID, {
      headers: {
        token: userToken,
      },
    });

    return BackendAdapterUtils.parseDSL(response.data);
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
        }))
      );

    const courseListTO = new CourseListTO();
    courseListTO.courses = response;
    return courseListTO;
  }

  async loginUser(userCredentials: UserCredentialParams): Promise<string> {
    const token = await axios.get<{
      lmsToken: string;
    }>("/Users/Login", {
      params: {
        UserName: userCredentials.username,
        Password: userCredentials.password,
      },
    });

    return token.data.lmsToken;
  }
}
