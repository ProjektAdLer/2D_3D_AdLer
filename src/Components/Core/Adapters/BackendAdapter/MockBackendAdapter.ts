import { injectable } from "inversify";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";
import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";
import H5PLearningElementData from "../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import ImageLearningElementData from "../../Domain/Entities/SpecificLearningElements/ImageLearningElementData";
import TextLearningElementData from "../../Domain/Entities/SpecificLearningElements/TextLearningElementData";
import VideoLearningElementData from "../../Domain/Entities/SpecificLearningElements/VideoLearningElementData";
import { LearningElementTypes } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import IBackendAdapter, { tempApiInfo } from "./IBackendAdapter";
import IDSL, { APILearningElement } from "./Types/IDSL";
import UserCredentials from "./Types/UserCredentials";

@injectable()
export default class MockBackendAdapter implements IBackendAdapter {
  getCoursesAvalibaleForUser(userToken: string): Promise<CourseListTO> {
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
  async getLearningWorldData({
    userToken,
    worldId,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>> {
    // get DSL
    let dsl = this.learningWorldTO;

    // // omit first learning room, since it is only used to store the dsl
    // dsl.learningWorld.learningSpaces =
    //   dsl.learningWorld.learningSpaces.slice(1);

    // create LearningWorldTO with learning world data
    let response: Partial<LearningWorldTO> = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goals,
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

  scoreLearningElement(learningElementId: number): Promise<void> {
    return Promise.resolve();
  }

  logInUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
  }

  private mapLearningElement = (
    element: APILearningElement
  ): LearningElementTO => {
    const learningElementTO: Partial<LearningElementTO> = {
      id: element.id,
      value: element.learningElementValueList
        ? Number.parseInt(element.learningElementValueList[0]?.value ?? "0")
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
          fileName: element.metaData?.find(
            (metaData) => metaData.key === "h5pFileName"
          )?.value,
          contextId: Number.parseInt(
            element.metaData?.find(
              (metaData) => metaData.key === "h5pContextId"
            )?.value || "0"
          ),
        } as H5PLearningElementData;
    }

    return learningElementTO as LearningElementTO;
  };

  learningWorldTO: IDSL = {
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
