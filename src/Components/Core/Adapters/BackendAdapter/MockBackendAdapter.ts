import { injectable } from "inversify";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import BackendWorldStatusTO from "../../Application/DataTransferObjects/BackendWorldStatusTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import BackendAdapterUtils from "./BackendAdapterUtils";
import IBackendAdapter, {
  getWorldDataParams,
  ScoreH5PElementRequest,
} from "./IBackendAdapter";
import IDSL from "./Types/IDSL";
import UserCredentials from "./Types/UserCredentials";

@injectable()
export default class MockBackendAdapter implements IBackendAdapter {
  deletePlayerData(userToken: string): Promise<boolean> {
    throw new Error(
      "Method not implemented, since we are in the Fake Backend."
    );
  }

  updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO> {
    return Promise.resolve(new PlayerDataTO());
  }

  getPlayerData(userToken: string): Promise<PlayerDataTO> {
    return Promise.resolve({
      playerGender: "Male",
      playerWorldColor: "Blue",
    });
  }

  getElementScore(
    userToken: string,
    elementID: ComponentID
  ): Promise<ElementScoreTO> {
    return Promise.resolve({
      elementID,
      success: true,
    });
  }

  getWorldStatus(
    userToken: string,
    worldID: ComponentID
  ): Promise<BackendWorldStatusTO> {
    return Promise.resolve({
      worldId: 1,
      elements: [
        {
          elementId: 1,
          success: true,
        },
        {
          elementId: 2,
          success: false,
        },
        {
          elementId: 3,
          success: false,
        },
        {
          elementId: 4,
          success: false,
        },
      ],
    });
  }

  getElementSource(userToken: string, elementID: number): Promise<string> {
    const elementType = this.worldTO.world.elements.find(
      (element) => element.elementId === elementID
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
        return Promise.resolve(
          "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
        );
      case "video":
        return Promise.resolve("https://youtu.be/8X4cDoM3R7E?t=189");
      case "image":
        return Promise.resolve(
          "https://testmoodle.cluuub.xyz/webservice/pluginfile.php/284/mod_resource/content/0/Cars%20is%20cool.jpg?forcedownload=1&token=46dd4cbdafda7fc864c8ce73aae3a897"
        );
      case "text":
        return Promise.resolve(
          "https://testmoodle.cluuub.xyz/webservice/pluginfile.php/282/mod_resource/content/0/Text-File-Example.txt?forcedownload=1&token=46dd4cbdafda7fc864c8ce73aae3a897"
        );
      case "pdf":
        return Promise.resolve(
          "https://www.africau.edu/images/default/sample.pdf"
        );
      /* istanbul ignore next */
      default:
        throw new Error("Unknown element type");
    }
  }

  scoreH5PElement(data: ScoreH5PElementRequest): Promise<boolean> {
    return Promise.resolve(true);
  }

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO> {
    return Promise.resolve({
      courses: [
        {
          courseID: 1,
          courseName: "Testkurs",
        },
      ],
    });
  }

  scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  loginUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
  }

  getWorldData({
    userToken,
    worldID,
  }: getWorldDataParams): Promise<Partial<BackendWorldTO>> {
    return Promise.resolve(BackendAdapterUtils.parseDSL(this.worldTO));
  }

  worldTO: IDSL = {
    fileVersion: "0.3",
    amgVersion: "0.3.2",
    author: "wAuthors",
    language: "de",
    world: {
      lmsElementIdentifier: {
        type: "moduleName",
        value: "worldName",
      },
      worldName: "worldName",
      worldDescription: "wDescription",
      worldGoals: ["wGoal"],
      topics: [
        {
          topicId: 1,
          topicName: "tbereich1",
          topicContents: [1, 2],
        },
        {
          topicId: 2,
          topicName: "tbereich2",
          topicContents: [3],
        },
        {
          topicId: 3,
          topicName: "tbereich3",
          topicContents: [4, 5],
        },
      ],
      spaces: [
        {
          spaceId: 1,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "raum1",
          },
          spaceName: "raum1",
          spaceDescription: "rdescription1",
          spaceGoals: ["rgoals1"],
          spaceContents: [1],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 2,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "raum2",
          },
          spaceName: "raum2",
          spaceDescription: "rdescription2",
          spaceGoals: ["rgoals2"],
          spaceContents: [2],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 3,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "raum3",
          },
          spaceName: "raum3",
          spaceDescription: "rdescription3",
          spaceGoals: ["rgoals3"],
          spaceContents: [3],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 4,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "raum4",
          },
          spaceName: "raum4",
          spaceDescription: "rdescription4",
          spaceGoals: ["rgoals4"],
          spaceContents: [4],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "(3)v((2)^(1))",
        },
        {
          spaceId: 5,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "raum5",
          },
          spaceName: "raum5",
          spaceDescription: "rdescription5",
          spaceGoals: ["rgoals5"],
          spaceContents: [5],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "4",
        },
      ],
      elements: [
        {
          elementId: 1,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "bild",
          },
          elementName: "bild",
          elementDescription: "bildbesch",
          elementGoals: ["bildgoals"],
          elementCategory: "image",
          elementFileType: "png",
          elementMaxScore: 1,
        },
        {
          elementId: 2,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "pdf",
          },
          elementName: "pdf",
          elementDescription: "pdfbes",
          elementGoals: ["pdfgoa"],
          elementCategory: "pdf",
          elementFileType: "pdf",
          elementMaxScore: 1,
        },
        {
          elementId: 3,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "text",
          },
          elementName: "text",
          elementDescription: "textbesch",
          elementGoals: ["textgoa"],
          elementCategory: "text",
          elementFileType: "txt",
          elementMaxScore: 1,
        },
        {
          elementId: 4,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "yturl",
          },
          elementName: "yturl",
          elementDescription: "yt",
          elementGoals: ["goals"],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 2,
        },
        {
          elementId: 5,
          lmsElementIdentifier: {
            type: "moduleName",
            value: "h5pfile",
          },
          elementName: "h5pfile",
          elementDescription: "h5pbes",
          elementGoals: ["h5pgoals"],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 2,
        },
      ],
    },
  };
}
