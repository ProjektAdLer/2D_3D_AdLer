import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import { logger } from "../../../../Lib/Logger";
import { ElementTypes } from "../../Presentation/Babylon/Elements/Types/ElementTypes";
import IDSL, { APIElement } from "./Types/IDSL";
import IBackendAdapter, {
  ScoreH5PElementRequest,
  tempApiInfo,
} from "./IBackendAdapter";
import WorldTO from "../../Application/DataTransportObjects/WorldTO";
import ElementTO from "../../Application/DataTransportObjects/ElementTO";
import TextElementData from "../../Domain/Entities/ElementData/TextElementData";
import ImageElementData from "../../Domain/Entities/ElementData/ImageElementData";
import VideoElementData from "../../Domain/Entities/ElementData/VideoElementData";
import H5PElementData from "../../Domain/Entities/ElementData/H5PElementData";
import SpaceTO from "../../Application/DataTransportObjects/SpaceTO";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";

@injectable()
export default class BackendAdapter implements IBackendAdapter {
  async scoreH5PElement(data: ScoreH5PElementRequest): Promise<void> {
    const response = await axios.patch(
      config.serverURL + "/LearningElements/H5P/" + data.h5pId,
      {
        serializedXAPIEvent: JSON.stringify(data.rawH5PEvent),
      },
      {
        headers: {
          token: data.userToken,
        },
      }
    );

    return response.data;
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
  }: tempApiInfo): Promise<Partial<WorldTO>> {
    // get DSL
    let dsl = await this.getDSL({
      userToken,
      worldId,
    });

    // omit first space, since it is only used to store the dsl
    dsl.learningWorld.learningSpaces =
      dsl.learningWorld.learningSpaces.slice(1);

    // create WorldTO with world data
    let response: Partial<WorldTO> = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goals,
    };

    // create ElementTOs
    let elements: ElementTO[] = dsl.learningWorld.learningElements.flatMap(
      (element) =>
        element.elementType in ElementTypes ? this.mapElement(element) : []
    );

    // create SpaceTOs and connect them with their elements
    response.spaces = dsl.learningWorld.learningSpaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.identifier.value,
        elements: elements.filter((element) =>
          space.learningSpaceContent.includes(element.id)
        ),
      } as SpaceTO;
    });

    return response;
  }

  async scoreElement(elementId: number): Promise<void> {
    logger.warn(
      `Tried to score Element ${elementId}. Functionality not implemented yet.`
    );

    return Promise.resolve();
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
  private mapElement = (element: APIElement): ElementTO => {
    const elementTO: Partial<ElementTO> = {
      id: element.id,
      value: element.learningElementValueList
        ? Number.parseInt(element.learningElementValueList[0]?.value ?? "0")
        : 0,
      requirements: element.requirements ?? [],
      name: element.identifier?.value,
    };

    switch (element.elementType) {
      case "text":
        elementTO.elementData = {
          type: "text",
        } as TextElementData;
        break;
      case "image":
        elementTO.elementData = {
          type: "image",
        } as ImageElementData;
        break;
      case "video":
        elementTO.elementData = {
          type: "video",
        } as VideoElementData;
        break;
      case "h5p":
        elementTO.elementData = {
          type: "h5p",
          fileName: element.metaData?.find(
            (metaData) => metaData.key === "h5pFileName"
          )?.value,
          contextId: Number.parseInt(
            element.metaData?.find(
              (metaData) => metaData.key === "h5pContextId"
            )?.value || "0"
          ),
        } as H5PElementData;
    }

    return elementTO as ElementTO;
  };
  private async getDSL({ userToken, worldId }: tempApiInfo): Promise<IDSL> {
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
