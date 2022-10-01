import { injectable } from "inversify";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import BackendAdapter from "./BackendAdapter";
import { ScoreH5PElementRequest, getWorldDataParams } from "./IBackendAdapter";
import IDSL from "./Types/IDSL";
import UserCredentials from "./Types/UserCredentials";

@injectable()
export default class MockBackendAdapter extends BackendAdapter {
  getH5PFileName(elementId: number, courseId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }
  scoreH5PElement(data: ScoreH5PElementRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO> {
    const test = {
      courses: [
        {
          courseId: 1,
          courseName: "Testkurs",
        },
      ],
    } as CourseListTO;

    return Promise.resolve(test);
  }

  scoreElement(elementId: number): Promise<void> {
    return Promise.resolve();
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
