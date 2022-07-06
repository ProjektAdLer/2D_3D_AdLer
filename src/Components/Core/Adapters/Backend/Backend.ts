import axios from "axios";
import { injectable } from "inversify";
import { logger } from "../../../../Lib/Logger";
import { LearningElementTypeSymbols } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import { APILearningElementTO } from "./APILearningElementTO";
import { APILearningRoomTO } from "./APILearningRoomTO";
import { APIWorldTo } from "./APIWorldTO";
import DSL from "./DSL";
import IBackend from "./IBackend";

@injectable()
export default class Backend implements IBackend {
  async getWorld(): Promise<Partial<APIWorldTo>> {
    let dsl = await this.getDSL();
    return {
      name: dsl.learningWorld.identifier.value,
      learningRoomIds: dsl.learningWorld.learningSpaces.map((space) => {
        return space.spaceId;
      }),
    } as Partial<APIWorldTo>;
  }

  async getLearningRooms(): Promise<(APILearningRoomTO | undefined)[]> {
    let dsl = await this.getDSL();
    return dsl.learningWorld.learningSpaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.identifier.value,
        learningElementIds: space.learningSpaceContent,
      } as APILearningRoomTO;
    });
  }

  async getLearningElements(): Promise<(APILearningElementTO | undefined)[]> {
    let dsl = await this.getDSL();
    return dsl.learningWorld.learningElements.flatMap((element) =>
      element.elementType in LearningElementTypeSymbols
        ? ({
            id: element.id,
            name: element.identifier.value,
            elementType: element.elementType,
            // mocked with debugging values
            value: [{ type: "points", value: 10 }],
            requirements: [],
            metaData: element.metaData,
          } as APILearningElementTO)
        : []
    );
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
    const token = await axios.post<string>(
      "https://api.cluuub.xyz/userlogin",
      userCredentials
    );

    return token.data;
  }

  private async getDSL(): Promise<DSL> {
    // TODO: replace this with a cached get request to the API-Server
    return mockDSL;

    // const response = await axios.post<DSL>(
    //   "https://api.cluuub.xyz/LearningWorld",
    //   {
    //     wsToken: "86215250e2e449dccec1559ff8629b17",
    //     courseName: "Lernwelt Autorentool",
    //   }
    // );
    // return response.data;
  }
}

const mockDSL: DSL = {
  learningWorld: {
    identifier: {
      type: "name",
      value: "Lernwelt Metriken",
    },
    learningWorldContent: [],
    topics: [],
    learningSpaces: [
      {
        spaceId: 1,
        learningSpaceName: "Lernraum Metriken",
        identifier: {
          type: "name",
          value: "Lernraum Metriken",
        },
        learningSpaceContent: [1, 2, 3],
        requirements: null,
      },
    ],
    learningElements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "Metriken Einstiegsvideo",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Metriken Teil 1" },
        ],
      },
      {
        id: 2,
        identifier: {
          type: "FileName",
          value: "Metriken Schiebespiel",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Schiebespiel Metriken" },
        ],
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "Metriken Wortsuche",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Wortsuche Metriken" },
        ],
      },
      {
        id: 4,
        identifier: {
          type: "FileName",
          value: "DSL Dokument",
        },
        elementType: "json",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "bla.h5p" },
        ],
      },
    ],
  },
};
