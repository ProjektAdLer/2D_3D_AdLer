import axios from "axios";
import { APILearningElementTO } from "./APILearningElementTO";
import { APILearningRoomTO } from "./APILearningRoomTO";
import { APIWorldTo } from "./APIWorldTO";
import DSL from "./DSL";
import IBackend from "./IBackend";

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
    return dsl.learningWorld.learningElements.map((element) => {
      return {
        id: element.id,
        name: element.identifier.value,
        elementType: element.elementType,
        // mocked with debugging values
        value: [{ type: "points", value: 10 }],
        requirements: [],
      } as APILearningElementTO;
    });
  }

  async scoreLearningElement(learningElementId: number): Promise<void> {
    console.log(
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
      },
    ],
  },
};
