import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import IDSL from "./Types/IDSL";
import IBackendAdapter, {
  ScoreH5PElementRequest,
  getWorldDataParams,
} from "./IBackendAdapter";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import BackendWorldStatusTO from "../../Application/DataTransferObjects/BackendWorldStatusTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";

import { createPatch } from "rfc6902";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import BackendAdapterUtils from "./BackendAdapterUtils";
import { getCoursesAvailableForUserResponse } from "./Types/getCoursesAvailableForUserResponse";

@injectable()
export default class BackendAdapter implements IBackendAdapter {
  async deletePlayerData(userToken: string): Promise<boolean> {
    const isSuceess = await axios.delete<boolean>(
      config.serverURL + "/PlayerData",
      {
        headers: {
          token: userToken,
        },
      }
    );

    return isSuceess.data;
  }

  async updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO> {
    const patchRequest = createPatch({}, playerData);

    const resp = await axios.patch<PlayerDataTO>(
      config.serverURL + "/PlayerData",
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
    const resp = await axios.get<PlayerDataTO>(
      config.serverURL + "/PlayerData",
      {
        headers: {
          token: userToken,
        },
      }
    );

    return resp.data;
  }

  async getElementScore(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<ElementScoreTO> {
    const resp = await axios.get<ElementScoreTO>(
      config.serverURL +
        "/LearningElements/Course/" +
        courseID +
        "/Element/" +
        elementID +
        "/Score",
      {
        headers: {
          token: userToken,
        },
      }
    );

    return resp.data;
  }

  async getWorldStatus(
    userToken: string,
    worldID: number
  ): Promise<BackendWorldStatusTO> {
    const resp = await axios.get<BackendWorldStatusTO>(
      config.serverURL + "/Courses/" + worldID + "/status",
      {
        headers: {
          token: userToken,
        },
      }
    );

    return resp.data;
  }

  getElementSource(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<string> {
    return axios
      .get<{ filePath: string }>(
        config.serverURL +
          "/LearningElements/FilePath/Course/" +
          courseID +
          "/Element/" +
          elementID,
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((response) => response.data.filePath);
  }

  async scoreH5PElement(data: ScoreH5PElementRequest): Promise<boolean> {
    const response = await axios.patch<{
      isSuceess: true;
    }>(
      config.serverURL +
        "/LearningElements/Course/" +
        data.courseID +
        "/Element/" +
        data.h5pID,
      {
        serializedXAPIEvent: JSON.stringify(data.rawH5PEvent),
      },
      {
        headers: {
          token: data.userToken,
        },
      }
    );

    return response.data.isSuceess;
  }

  async getCoursesAvailableForUser(userToken: string) {
    const response = await axios
      .get<getCoursesAvailableForUserResponse>(config.serverURL + "/Courses", {
        params: {
          limitToEnrolled: false,
        },
        headers: {
          token: userToken,
        },
      })
      .then((response) =>
        response.data.courses.map((course) => ({
          courseID: course.courseId,
          courseName: course.courseName,
        }))
      );

    const courseListTO = new CourseListTO();
    courseListTO.courses = response;
    return courseListTO;
  }

  async getWorldData({
    userToken,
    worldID,
  }: getWorldDataParams): Promise<BackendWorldTO> {
    const response = await axios.get<IDSL>(
      config.serverURL + "/Courses/" + worldID,
      {
        headers: {
          token: userToken,
        },
      }
    );

    return BackendAdapterUtils.parseDSL(response.data);
  }

  async scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean> {
    const response = await axios.patch<{
      isSuceess: boolean;
    }>(
      config.serverURL +
        "/LearningElements/Course/" +
        courseID +
        "/Element/" +
        elementID,
      {},
      {
        headers: {
          token: userToken,
        },
      }
    );

    return response.data.isSuceess;
  }

  async loginUser(userCredentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const token = await axios.get<{
      moodleToken: string;
    }>(config.serverURL + "/Users/Login", {
      params: {
        UserName: userCredentials.username,
        Password: userCredentials.password,
      },
    });

    return token.data.moodleToken;
  }
}
