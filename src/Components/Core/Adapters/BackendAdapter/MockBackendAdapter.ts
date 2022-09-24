import { injectable } from "inversify";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import H5PElementData from "../../Domain/Entities/ElementData/H5PElementData";
import ImageElementData from "../../Domain/Entities/ElementData/ImageElementData";
import TextElementData from "../../Domain/Entities/ElementData/TextElementData";
import VideoElementData from "../../Domain/Entities/ElementData/VideoElementData";
import { ElementTypes } from "../../Presentation/Babylon/Elements/Types/ElementTypes";
import IBackendAdapter, {
  ScoreH5PElementRequest,
  tempApiInfo,
} from "./IBackendAdapter";
import IDSL, { APIElement } from "./Types/IDSL";
import UserCredentials from "./Types/UserCredentials";

@injectable()
export default class MockBackendAdapter implements IBackendAdapter {
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
  async getWorldData({
    userToken,
    worldId,
  }: tempApiInfo): Promise<Partial<WorldTO>> {
    // get DSL
    let dsl = this.worldTO;

    // // omit first learning room, since it is only used to store the dsl
    // dsl.learningWorld.learningSpaces =
    //   dsl.learningWorld.learningSpaces.slice(1);

    // create LearningWorldTO with learning world data
    let response: Partial<WorldTO> = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goals,
    };

    // create LearningElementTOs
    let elements: ElementTO[] = dsl.learningWorld.learningElements.flatMap(
      (element) =>
        element.elementType in ElementTypes ? this.mapElement(element) : []
    );

    // create LearningRoomTOs and connect them with their learning elements
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

  scoreElement(elementId: number): Promise<void> {
    return Promise.resolve();
  }

  logInUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
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

  worldTO: IDSL = {
    learningWorld: {
      idNumber: "1a28a418-00f5-4b24-8ac0-5b4e03ed3f73",
      identifier: {
        type: "name",
        value: "Lernwelt Metriken - 4 H5P",
      },
      description: "Mock Beschreibung der Welt",
      goals: "Mock Ziele der Welt",
      learningWorldContent: [],
      topics: [],
      learningSpaces: [
        {
          spaceId: 0,
          identifier: {
            type: "name",
            value: "Freie Lernelemente",
          },
          description: "Diese Lernelemente sind keinem Lernraum zugeordnet",
          goals: "",
          learningSpaceContent: [1, 2, 3, 4, 5],
          requirements: null,
        },
      ],
      learningElements: [
        {
          id: 1,
          identifier: {
            type: "FileName",
            value: "DSL_Document",
          },
          description: "",
          goals: "",
          elementType: "json",
          learningElementValueList: [
            {
              type: "Points",
              value: "0",
            },
          ],
          learningSpaceParentId: 0,
          requirements: null,
          metaData: null,
        },
        {
          id: 2,
          identifier: {
            type: "FileName",
            value: "H5P Element",
          },
          description: "Diies ist die Beschreibung des H5P Elements.",
          goals: "Ziel des H5P Lernelements",
          elementType: "h5p",
          learningElementValueList: [
            {
              type: "Points",
              value: "15",
            },
          ],
          learningSpaceParentId: 0,
          requirements: null,
          metaData: [
            {
              key: "h5pFileName",
              value:
                "wwwroot/courses/2/Lernwelt Metriken - 4 H5P/h5p/Einführungsvideo",
            },
            {
              key: "h5pContextId",
              value: "1337",
            },
          ],
        },
        {
          id: 3,
          identifier: {
            type: "FileName",
            value: "Textelement",
          },
          description: "Dies ist die Beschreibung des Text Lernelements",
          goals: "Ziel des Text-Elements",
          elementType: "text",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 0,
          requirements: null,
          metaData: [],
        },
        {
          id: 4,
          identifier: {
            type: "FileName",
            value: "Bildelement",
          },
          description:
            "Dies ist die Beschreibung des Bildes. Hier wird das Bild erklärt.",
          goals: "Ziel des Bild-Elements.",
          elementType: "image",
          learningElementValueList: [
            {
              type: "Points",
              value: "25",
            },
          ],
          learningSpaceParentId: 0,
          requirements: null,
          metaData: [],
        },
        {
          id: 5,
          identifier: {
            type: "FileName",
            value: "Videoelement",
          },
          description:
            "Das ist die beschreibung für das Videoelement. Hier wird das Video erklärt.",
          goals: "Ziel des Video-Elements",
          elementType: "video",
          learningElementValueList: [
            {
              type: "Points",
              value: "30",
            },
          ],
          learningSpaceParentId: 0,
          requirements: null,
          metaData: [],
        },
      ],
    },
  };
}
