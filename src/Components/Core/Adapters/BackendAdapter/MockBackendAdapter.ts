import { injectable } from "inversify";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import ElementScoreTO from "../../Application/DataTransferObjects/ElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import WorldStatusTO from "../../Application/DataTransferObjects/WorldStatusTO";
import { ElementID } from "../../Domain/Types/EntityTypes";
import BackendAdapter from "./BackendAdapter";
import { ScoreH5PElementRequest, getWorldDataParams } from "./IBackendAdapter";
import IDSL from "./Types/IDSL";
import UserCredentials from "./Types/UserCredentials";

@injectable()
export default class MockBackendAdapter extends BackendAdapter {
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
    elementId: ElementID,
    courseId: ElementID
  ): Promise<ElementScoreTO> {
    return Promise.resolve({
      elementId: elementId,
      successss: true,
    });
  }
  getWorldStatus(userToken: string, worldId: number): Promise<WorldStatusTO> {
    return Promise.resolve({
      courseId: 1,
      learningElements: [
        {
          elementId: 1,
          successss: false,
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
  getElementSource(
    userToken: string,
    elementId: number,
    courseId: number
  ): Promise<string> {
    const elementType = this.worldTO.learningWorld.learningElements.find(
      (element) => element.id === elementId
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
        return Promise.resolve(
          "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
        );
      case "video":
        return Promise.resolve(
          "https://www.youtube.com/watch?v=UEJpDrXuP98&ab_channel=AbroadinJapan&token=46dd4cbdafda7fc864c8ce73aae3a897"
        );
      case "image":
        return Promise.resolve(
          "https://testmoodle.cluuub.xyz/webservice/pluginfile.php/284/mod_resource/content/0/Cars%20is%20cool.jpg?forcedownload=1&token=46dd4cbdafda7fc864c8ce73aae3a897"
        );
      case "text":
        return Promise.resolve(
          "https://testmoodle.cluuub.xyz/webservice/pluginfile.php/282/mod_resource/content/0/Text-File-Example.txt?forcedownload=1&token=46dd4cbdafda7fc864c8ce73aae3a897"
        );
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

  logInUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
  }

  public async getDSL({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<IDSL> {
    return this.worldTO;
  }

  worldTO: IDSL = {
    learningWorld: {
      idNumber: "ac187daa-e3a7-4dbc-820d-1f9b1a978964",
      identifier: {
        type: "name",
        value: "World_For_Evaluation",
      },
      description:
        "Eine coole Welt für die Evaluation, welche alle Lernelemente enthält die zur Verfügung stehen",
      goals:
        "Eine coole Welt für die Evaluation, welche alle Lernelemente enthält die zur Verfügung stehen",
      learningWorldContent: [1],
      learningSpaces: [
        {
          spaceId: 1,
          identifier: {
            type: "name",
            value: "Space_Number_1",
          },
          description: "Der erste und einzige Lernraum",
          goals: "Der erste und einzige Lernraum",
          learningSpaceContent: [1, 2, 3, 4],
          requiredPoints: 100,
          includedPoints: 150,
          requirements: [],
        },
      ],
      learningElements: [
        {
          id: 1,
          identifier: {
            type: "FileName",
            value: "Youtube-Link-English",
          },
          description: "Ein video zur Vortbildung",
          goals: "Bitte anschauen",
          elementCategory: "video",
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
            value: "Text-File-Example",
          },
          description: "Text-File-Example from the Internet",
          goals: "Text-File-Example",
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
            value: "H5P-SchiebeSpiel",
          },
          description: "H5P-SchiebeSpiel not too easy",
          goals: "Do something here",
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
          id: 4,
          identifier: {
            type: "FileName",
            value: "Cars is cool",
          },
          description: "2 Cars",
          goals: "What colors are those cars",
          elementCategory: "image",
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
