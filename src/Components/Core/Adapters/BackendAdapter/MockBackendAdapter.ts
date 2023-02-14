import { injectable } from "inversify";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import BackendWorldStatusTO from "../../Application/DataTransferObjects/BackendWorldStatusTO";
import { ElementID } from "../../Domain/Types/EntityTypes";
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
    elementId: ElementID
  ): Promise<ElementScoreTO> {
    return Promise.resolve({
      elementId: elementId,
      successss: true,
    });
  }

  getWorldStatus(
    userToken: string,
    worldId: number
  ): Promise<BackendWorldStatusTO> {
    return Promise.resolve({
      courseId: 1,
      learningElements: [
        {
          elementId: 1,
          successss: true,
        },
        {
          elementId: 2,
          successss: false,
        },
        {
          elementId: 3,
          successss: false,
        },
        {
          elementId: 4,
          successss: false,
        },
      ],
    });
  }

  getElementSource(userToken: string, elementId: number): Promise<string> {
    const elementType = this.worldTO.learningWorld.learningElements.find(
      (element) => element.id === elementId
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
          courseId: 1,
          courseName: "Testkurs",
        },
      ],
    });
  }

  scoreElement(
    userToken: string,
    elementId: ElementID,
    courseId: ElementID
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  loginUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
  }

  getWorldData({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<Partial<BackendWorldTO>> {
    return Promise.resolve(BackendAdapterUtils.parseDSL(this.worldTO));
  }

  worldTO: IDSL = {
    learningWorld: {
      idNumber: "c841bcde-56f6-41b2-97b7-f0f82b0fb0c1",
      identifier: {
        type: "name",
        value: "Lernwelt mit dem aktuellen Stand",
      },
      description: "Hier wird der aktuelle Stand der Lernwelt beschrieben.",
      goals:
        "Studierenden benennen den englischen Begriff und die Abk\u00FCrzung.\nStudierende nennen die Bestandteile, Daten und Methoden, von abstrakten Datentypen.\nStudierende nennen zu den Bestandteilen auch die Eigenschaften, implementierbar in versch. Sprachen, versch. Anwendungsgebiete.\nStudierende beschreiben die zwei Datenkategorien Nutzerdaten und Verwaltungsdaten in Abstrakten Datentypen.\nStudierende beschreiben Gemeinsamkeiten und Unterschiede von Abstrakten Datentypen gg\u00FC.(klassischen) Datentypen.\nStudierende z\u00E4hlen verschiedene Abstrakte Datentypen auf.",
      learningWorldContent: [],
      learningSpaces: [
        {
          spaceId: 1,
          identifier: {
            type: "name",
            value: "Raum Nummer 1",
          },
          description: "Beschreibung des Raumes 1",
          goals:
            "Studierenden benennen den englischen Begriff und die Abk\u00FCrzung.\nStudierende nennen die Bestandteile, Daten und Methoden, von abstrakten Datentypen.\nStudierende nennen zu den Bestandteilen auch die Eigenschaften, implementierbar in versch. Sprachen, versch. Anwendungsgebiete.\nStudierende beschreiben die zwei Datenkategorien Nutzerdaten und Verwaltungsdaten in Abstrakten Datentypen.\nStudierende beschreiben Gemeinsamkeiten und Unterschiede von Abstrakten Datentypen gg\u00FC.(klassischen) Datentypen.\nStudierende z\u00E4hlen verschiedene Abstrakte Datentypen auf.",
          learningSpaceContent: [1, 2, 3, 4, 17],
          requiredPoints: 0,
          requirements: [],
        },
        {
          spaceId: 2,
          identifier: {
            type: "name",
            value: "Raum Nummer 2",
          },
          description: "Beschreibung des Raumes 2",
          goals: "Lernziel des Raumes 2",
          learningSpaceContent: [5, 6, 7, 8],
          requiredPoints: 50,
          requirements: [1, 3],
        },
        {
          spaceId: 3,
          identifier: {
            type: "name",
            value: "Raum Nummer 3",
          },
          description: "Beschreibung des Raumes 3",
          goals: "Lernziel des Raumes 3",
          learningSpaceContent: [9, 10, 11, 12],
          requiredPoints: 50,
          requirements: [1],
        },
        {
          spaceId: 4,
          identifier: {
            type: "name",
            value: "Raum Nummer 4",
          },
          description: "Beschreibung des Raumes 4",
          goals: "Lernziel des Raumes 4",
          learningSpaceContent: [13, 14, 15, 16],
          requiredPoints: 50,
          requirements: [2, 3],
        },
      ],
      learningElements: [
        {
          id: 1,
          identifier: {
            type: "FileName",
            value: "Ein H5P Element",
          },
          description: "H5p",
          goals: "H5p",
          elementCategory: "h5p",
          learningElementValueList: [
            {
              type: "Points",
              value: "50",
            },
          ],
          learningSpaceParentId: 1,
        },
        {
          id: 2,
          identifier: {
            type: "FileName",
            value: "Ein Textelement",
          },
          description: "Text datei",
          goals: "Text datei",
          elementCategory: "text",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 1,
        },
        {
          id: 3,
          identifier: {
            type: "FileName",
            value: "Ein Bild als Lernelement",
          },
          description: "2 - Autos",
          goals: "2 - Autos",
          elementCategory: "image",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 1,
        },
        {
          id: 4,
          identifier: {
            type: "FileName",
            value: "Ein Lernvideo auf Youtube",
          },
          description: "Video-Url",
          goals: "Video-Url",
          elementCategory: "video",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 1,
        },
        {
          id: 5,
          identifier: {
            type: "FileName",
            value: "Schiebespiel",
          },
          description: "Schiebespiel",
          goals: "Schiebespiel",
          elementCategory: "h5p",
          learningElementValueList: [
            {
              type: "Points",
              value: "50",
            },
          ],
          learningSpaceParentId: 2,
        },
        {
          id: 6,
          identifier: {
            type: "FileName",
            value: "Video-Link-Wichtig",
          },
          description: "Video-Link-Wichtig",
          goals: "Video-Link-Wichtig",
          elementCategory: "video",
          learningElementValueList: [
            {
              type: "Points",
              value: "75",
            },
          ],
          learningSpaceParentId: 2,
        },
        {
          id: 7,
          identifier: {
            type: "FileName",
            value: "Generisches Bild",
          },
          description: "Generisches Bild",
          goals: "Generisches Bild",
          elementCategory: "image",
          learningElementValueList: [
            {
              type: "Points",
              value: "50",
            },
          ],
          learningSpaceParentId: 2,
        },
        {
          id: 8,
          identifier: {
            type: "FileName",
            value: "Ich habe getrunken datei",
          },
          description: "Ich habe getrunken datei",
          goals: "Ich habe getrunken datei",
          elementCategory: "text",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 2,
        },
        {
          id: 9,
          identifier: {
            type: "FileName",
            value: "H5P-Schieben",
          },
          description: "H5P-Schieben",
          goals: "H5P-Schieben",
          elementCategory: "h5p",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 3,
        },
        {
          id: 10,
          identifier: {
            type: "FileName",
            value: "Text-Datei script",
          },
          description: "Text-Datei script",
          goals: "Text-Datei script",
          elementCategory: "text",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 3,
        },
        {
          id: 11,
          identifier: {
            type: "FileName",
            value: "Laptop-Bild",
          },
          description: "Laptop-Bild",
          goals: "Laptop-Bild",
          elementCategory: "image",
          learningElementValueList: [
            {
              type: "Points",
              value: "123",
            },
          ],
          learningSpaceParentId: 3,
        },
        {
          id: 12,
          identifier: {
            type: "FileName",
            value: "Video-Url-Youtube",
          },
          description: "Video-Url-Youtube",
          goals: "Video-Url-Youtube",
          elementCategory: "video",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 3,
        },
        {
          id: 13,
          identifier: {
            type: "FileName",
            value: "Das letzte H5p video",
          },
          description: "Das letzte H5p video",
          goals: "Das letzte H5p video",
          elementCategory: "h5p",
          learningElementValueList: [
            {
              type: "Points",
              value: "50",
            },
          ],
          learningSpaceParentId: 4,
        },
        {
          id: 14,
          identifier: {
            type: "FileName",
            value: "Drehbuch zum letzten treffen",
          },
          description: "Drehbuch zum letzten treffen",
          goals: "Drehbuch zum letzten treffen",
          elementCategory: "text",
          learningElementValueList: [
            {
              type: "Points",
              value: "45",
            },
          ],
          learningSpaceParentId: 4,
        },
        {
          id: 15,
          identifier: {
            type: "FileName",
            value: "youtube-link-zeug",
          },
          description: "youtube-link-zeug",
          goals: "youtube-link-zeug",
          elementCategory: "video",
          learningElementValueList: [
            {
              type: "Points",
              value: "50",
            },
          ],
          learningSpaceParentId: 4,
        },
        {
          id: 16,
          identifier: {
            type: "FileName",
            value: "trickfilm autos",
          },
          description: "trickfilm autos",
          goals: "trickfilm autos",
          elementCategory: "image",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 4,
        },
        {
          id: 17,
          identifier: {
            type: "FileName",
            value: "Sample PDF",
          },
          description: "PDF datei",
          goals: "PDF datei",
          elementCategory: "pdf",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 1,
        },
      ],
    },
  };
}
