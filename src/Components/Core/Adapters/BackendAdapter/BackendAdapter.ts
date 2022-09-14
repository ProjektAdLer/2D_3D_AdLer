import axios from "axios";
import { injectable } from "inversify";
import { config } from "../../../../config";
import { logger } from "../../../../Lib/Logger";
import { LearningElementTypes } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import IDSL, { APILearningElement } from "./Types/IDSL";
import IBackendAdapter, { tempApiInfo } from "./IBackendAdapter";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";
import TextLearningElementData from "../../Domain/Entities/SpecificLearningElements/TextLearningElementData";
import ImageLearningElementData from "../../Domain/Entities/SpecificLearningElements/ImageLearningElementData";
import VideoLearningElementData from "../../Domain/Entities/SpecificLearningElements/VideoLearningElementData";
import H5PLearningElementData from "../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";

@injectable()
export default class BackendAdapter implements IBackendAdapter {
  async getCoursesAvalibaleForUser(userToken: string): Promise<CourseListTO> {
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
  async getLearningWorldData({
    userToken,
    worldId,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>> {
    // get DSL
    let dsl = await this.getDSL({
      userToken,
      worldId,
    });

    // omit first learning room, since it is only used to store the dsl
    dsl.learningWorld.learningSpaces =
      dsl.learningWorld.learningSpaces.slice(1);

    // create LearningWorldTO with learning world data
    let response: Partial<LearningWorldTO> = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goal,
    };

    // create LearningElementTOs
    let learningElements: LearningElementTO[] =
      dsl.learningWorld.learningElements.flatMap((element) =>
        element.elementType in LearningElementTypes
          ? this.mapLearningElement(element)
          : []
      );

    // create LearningRoomTOs and connect them with their learning elements
    response.learningRooms = dsl.learningWorld.learningSpaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.identifier.value,
        learningElements: learningElements.filter((element) =>
          space.learningSpaceContent.includes(element.id)
        ),
      } as LearningRoomTO;
    });

    return response;
  }

  async scoreLearningElement(learningElementId: number): Promise<void> {
    logger.warn(
      `Tried to score Learningelement ${learningElementId}. Functionality not implemented yet.`
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
  private mapLearningElement = (
    element: APILearningElement
  ): LearningElementTO => {
    const learningElementTO: Partial<LearningElementTO> = {
      id: element.id,
      value: element.learningElementValue
        ? element.learningElementValue.value
        : 0,
      requirements: element.requirements ?? [],
      name: element.identifier?.value,
    };

    switch (element.elementType) {
      case "text":
        learningElementTO.learningElementData = {
          type: "text",
        } as TextLearningElementData;
        break;
      case "image":
        learningElementTO.learningElementData = {
          type: "image",
        } as ImageLearningElementData;
        break;
      case "video":
        learningElementTO.learningElementData = {
          type: "video",
        } as VideoLearningElementData;
        break;
      case "h5p":
        learningElementTO.learningElementData = {
          type: "h5p",
          fileName: element.metaData.find(
            (metaData) => metaData.key === "h5pFileName"
          )?.value,
          contextId: Number.parseInt(
            element.metaData.find((metaData) => metaData.key === "h5pContextId")
              ?.value || "0"
          ),
        } as H5PLearningElementData;
    }

    return learningElementTO as LearningElementTO;
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
