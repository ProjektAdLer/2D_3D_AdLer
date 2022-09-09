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

@injectable()
export default class BackendAdapter implements IBackendAdapter {
  async getLearningWorldData({
    userToken,
    worldName,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>> {
    // get DSL
    let dsl = await this.getDSL({
      userToken,
      worldName,
    });

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
    const token = await axios.post<string>(
      config.serverURL + "/userlogin",
      userCredentials
    );

    return token.data;
  }

  private async getDSL({ userToken, worldName }: tempApiInfo): Promise<IDSL> {
    const response = await axios.post<IDSL>(
      config.serverURL + "/LearningWorld",
      {
        wsToken: userToken,
        courseName: worldName,
      }
    );

    return response.data;
  }
}
