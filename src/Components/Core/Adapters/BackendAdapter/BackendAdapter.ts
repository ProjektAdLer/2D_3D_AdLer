import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import { ElementTypes } from "../../Presentation/Babylon/Elements/Types/ElementTypes";
import IDSL, { APIElement } from "./Types/IDSL";
import IBackendAdapter, {
  ScoreH5PElementRequest,
  getWorldDataParams,
} from "./IBackendAdapter";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import { ElementID } from "../../Domain/Types/EntityTypes";
import WorldStatusTO from "../../Application/DataTransferObjects/WorldStatusTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";

import { createPatch } from "rfc6902";

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
    elementId: ElementID,
    courseId: ElementID
  ): Promise<ElementScoreTO> {
    const resp = await axios.get<ElementScoreTO>(
      config.serverURL +
        "/LearningElements/Course/" +
        courseId +
        "/Element/" +
        elementId +
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
    worldId: number
  ): Promise<WorldStatusTO> {
    const resp = await axios.get<WorldStatusTO>(
      config.serverURL + "/Courses/" + worldId + "/status",
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
    elementId: number,
    courseId: number
  ): Promise<string> {
    return axios
      .get<{ filePath: string }>(
        config.serverURL +
          "/LearningElements/FilePath/Course/" +
          courseId +
          "/Element/" +
          elementId,
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
        data.courseId +
        "/Element/" +
        data.h5pId,
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

  async getCoursesAvailableForUser(userToken: string): Promise<CourseListTO> {
    const response = await axios.get<CourseListTO>(
      config.serverURL + "/Courses",
      {
        params: {
          limitToEnrolled: false,
        },
        headers: {
          token: userToken,
        },
      }
    );

    return response.data;
  }
  async getWorldData({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<WorldTO> {
    // get DSL
    let dsl = await this.getDSL({
      userToken,
      worldId,
    });

    // create ElementTOs
    const elements: ElementTO[] = dsl.learningWorld.learningElements.flatMap(
      (element) =>
        element.elementCategory in ElementTypes ? this.mapElement(element) : []
    );

    // create SpaceTOs and connect them with their elements
    const spaces = dsl.learningWorld.learningSpaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.identifier.value,
        elements: elements.filter((element) =>
          space.learningSpaceContent.includes(element.id)
        ),
        description: space.description,
        goals: space.goals,
        requirements: space.requirements,
      } as SpaceTO;
    });

    // create WorldTO with world data
    let response: WorldTO = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goals,
      spaces: spaces,
      description: dsl.learningWorld.description,
      goals: dsl.learningWorld.goals,
    };

    return response;
  }

  async scoreElement(
    userToken: string,
    elementId: ElementID,
    courseId: ElementID
  ): Promise<boolean> {
    const response = await axios.patch<{
      isSuceess: true;
    }>(
      config.serverURL +
        "/LearningElements/Course/" +
        courseId +
        "/Element/" +
        elementId,
      {},
      {
        headers: {
          token: userToken,
        },
      }
    );

    return response.data.isSuceess;
  }

  async logInUser(userCredentials: {
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
  public mapElement = (element: APIElement): ElementTO => {
    return {
      id: element.id,
      description: element.description,
      goals: element.goals,
      name: element.identifier.value,
      type: element.elementCategory,
      value: Number.parseInt(element.learningElementValueList[0].value) || 0,
      parentSpaceId: element.learningSpaceParentId,
    } as ElementTO;
  };
  public async getDSL({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<IDSL> {
    const response = await axios.get<IDSL>(
      config.serverURL + "/Courses/" + worldId,
      {
        headers: {
          token: userToken,
        },
      }
    );

    return response.data;
  }
}
