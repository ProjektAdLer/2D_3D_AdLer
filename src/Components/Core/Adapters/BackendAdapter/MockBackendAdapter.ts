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
} from "../../Application/Ports/Interfaces/IBackendPort";
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
      worldId: worldID,
      elements: [
        {
          elementId: 1,
          success: true,
        },
        {
          elementId: 2,
          success: true,
        },
        {
          elementId: 3,
          success: false,
        },
        {
          elementId: 4,
          success: false,
        },
        {
          elementId: 5,
          success: false,
        },
      ],
    });
  }

  getElementSource(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID
  ): Promise<string> {
    const worldToUse = courseID === 1 ? this.smallWorld : this.bigWorld;
    const elementType = worldToUse.world.elements.find(
      (element) => element.elementId === elementID
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
        return Promise.reject(
          "H5P elements are not supported in the backend mock."
        );
      case "video":
        return Promise.resolve("https://youtu.be/8X4cDoM3R7E?t=189");
      case "image":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/testBild.png"
        );
      case "text":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/testText.txt"
        );
      case "pdf":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/testPDF.pdf"
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
          courseName: "Small World",
        },
        {
          courseID: 2,
          courseName: "Big World",
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
    return Promise.resolve(
      BackendAdapterUtils.parseDSL(
        worldID === 1 ? this.smallWorld : this.bigWorld
      )
    );
  }

  smallWorld: IDSL = {
    fileVersion: "0.3",
    amgVersion: "0.3.2",
    author: "Ricardo ",
    language: "de",
    world: {
      worldName: "Small World",
      worldDescription:
        "Small World with only one topic and one space but with all elements",
      worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
      topics: [
        {
          topicId: 7,
          topicName: "Themenbereich der kleinen Welt",
          topicContents: [6],
        },
      ],
      spaces: [
        {
          spaceId: 6,
          spaceName: "Raum der kleinen Welt",
          spaceDescription: "Raumbeschreibung der kleinen Welt",
          spaceContents: [1, 2, 3, 4, 5],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
          spaceGoals: ["Raumziel 1/3", "Raumziel 2/3", "Raumziel 3/3"],
        },
      ],
      elements: [
        {
          elementId: 1,
          elementName: "Ein Text-Lernelement",
          elementCategory: "text",
          elementDescription: "Beschreibung des Text-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "text",
          elementMaxScore: 1,
        },
        {
          elementId: 2,
          elementName: "Ein Video-Lernelement",
          elementCategory: "video",
          elementDescription: "Beschreibung des Video-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "video",
          elementMaxScore: 1,
        },
        {
          elementId: 3,
          elementName: "Ein Bild-Lernelement",
          elementCategory: "image",
          elementDescription: "Beschreibung des Bild-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "image",
          elementMaxScore: 1,
        },
        {
          elementId: 4,
          elementName: "Ein PDF-Lernelement",
          elementCategory: "pdf",
          elementDescription: "Beschreibung des PDF-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "pdf",
          elementMaxScore: 1,
        },
        {
          elementId: 5,
          elementName: "Ein H5P-Lernelement",
          elementCategory: "h5p",
          elementDescription: "Beschreibung des H5P-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "h5p",
          elementMaxScore: 1,
        },
      ],
    },
  };

  bigWorld: IDSL = {
    fileVersion: "0.3",
    amgVersion: "0.3.2",
    author: "Au Thor",
    language: "de",
    world: {
      worldName: "Big World",
      worldDescription: "Beschreibung der großen Welt",
      worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
      topics: [
        {
          topicId: 1,
          topicName: "Topic 1",
          topicContents: [1, 2],
        },
        {
          topicId: 2,
          topicName: "Topic 2",
          topicContents: [3],
        },
        {
          topicId: 3,
          topicName: "Topic 3",
          topicContents: [4, 5],
        },
      ],
      spaces: [
        {
          spaceId: 1,
          spaceName: "Abgeschlossener Raum mit einem Lernelement",
          spaceDescription: "Ja, der Name dieses Raumes ist extrea so lang",
          spaceGoals: [
            "Ziel des abgeschlossenen Raumes 1/3",
            "Ziel des abgeschlossenen Raumes 2/3",
            "Ziel des abgeschlossenen Raumes 3/3",
          ],
          spaceContents: [1],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 2,
          spaceName: "Lernraum 2",
          spaceDescription: "rdescription2",
          spaceGoals: ["rgoals2"],
          spaceContents: [2],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 3,
          spaceName: "Lernraum 3",
          spaceDescription: "rdescription3",
          spaceGoals: ["rgoals3"],
          spaceContents: [3],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
        },
        {
          spaceId: 4,
          spaceName: "  Lernraum 4",
          spaceDescription: "rdescription4",
          spaceGoals: ["rgoals4"],
          spaceContents: [4],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "(3)v((2)^(1))",
        },
        {
          spaceId: 5,
          spaceName: "Der lernraum 5",
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
          elementName: "Bild welches in Raum 1 abgeschlossen ist",
          elementDescription:
            "Beschreibung des in Raum 1 abgeschlossenen Bild-Lernelements",
          elementGoals: [
            "Ziel des Bild-Lernelements 1/3",
            "Ziel des Bild-Lernelements 2/3",
            "Ziel des Bild-Lernelements 3/3",
          ],
          elementCategory: "image",
          elementFileType: "png",
          elementMaxScore: 1,
        },
        {
          elementId: 2,
          elementName: "Ein PDF-Lernelement",
          elementDescription: "Beschreibung des PDF-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementCategory: "pdf",
          elementFileType: "pdf",
          elementMaxScore: 1,
        },
        {
          elementId: 3,
          elementName: "Ein Text-Lernelement",
          elementDescription: "Beschreibung des Text-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementCategory: "text",
          elementFileType: "txt",
          elementMaxScore: 1,
        },
        {
          elementId: 4,
          elementName: "Ein Video-Lernelement",
          elementDescription: " Beschreibung des Video-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 2,
        },
        {
          elementId: 5,
          elementName: "Ein H5P-Lernelement",
          elementDescription: "Beschreibung des H5P-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 2,
        },
      ],
    },
  };
}
