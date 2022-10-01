import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import { logger } from "../../../../Lib/Logger";
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

@injectable()
export default class BackendAdapter implements IBackendAdapter {
  getElementSource(
    userToken: string,
    elementId: number,
    courseId: number
  ): Promise<string> {
    return axios
      .get<{ filePath: string }>(
        config.serverURL +
          "/LearningElements/H5P/FilePath/Course/" +
          courseId +
          "/Element/" +
          elementId,
        {
          headers: {
            token: "token",
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
    logger.warn(
      `Tried to score Element ${elementId}. Functionality not implemented yet.`
    );

    return Promise.resolve(true);
  }

  async logInUser(userCredentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const token = await axios.get<{
      moodleToken: string;
    }>(config.serverURL + "/MoodleLogin/Login", {
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
