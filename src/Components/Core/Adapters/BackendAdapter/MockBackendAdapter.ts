import { injectable } from "inversify";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import LearningElementScoreTO from "../../Application/DataTransferObjects/LearningElementScoreTO";
import PlayerDataTO from "../../Application/DataTransferObjects/PlayerDataTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import BackendAdapterUtils from "./BackendAdapterUtils";
import IBackendPort, {
  ElementDataParams,
  GetWorldDataParams,
  ScoreH5PElementParams,
  UserCredentialParams,
} from "../../Application/Ports/Interfaces/IBackendPort";
import AWT from "./Types/AWT";
import LearningWorldStatusTO from "../../Application/DataTransferObjects/LearningWorldStatusTO";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "../../Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "../../Domain/Types/LogLevelTypes";

@injectable()
export default class MockBackendAdapter implements IBackendPort {
  deletePlayerData(userToken: string): Promise<boolean> {
    const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
    logger.log(LogLevelTypes.DEBUG, "MockBackendAdapter.deletePlayerData");
    return Promise.resolve(true);
  }

  updatePlayerData(
    userToken: string,
    playerData: Partial<PlayerDataTO>
  ): Promise<PlayerDataTO> {
    return Promise.resolve(
      Object.assign(new PlayerDataTO(), playerData) as PlayerDataTO
    );
  }

  getPlayerData(userToken: string): Promise<PlayerDataTO> {
    return Promise.resolve({
      playerGender: "Male",
      playerWorldColor: "Blue",
    });
  }

  getElementScore({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<LearningElementScoreTO> {
    return Promise.resolve({
      elementID,
      success: true,
    });
  }

  getWorldStatus(
    userToken: string,
    worldID: ComponentID
  ): Promise<LearningWorldStatusTO> {
    return Promise.resolve({
      worldID: worldID,
      elements: [
        {
          elementID: 1,
          hasScored: true,
        },
        {
          elementID: 2,
          hasScored: true,
        },
        {
          elementID: 3,
          hasScored: false,
        },
        {
          elementID: 4,
          hasScored: false,
        },
        {
          elementID: 5,
          hasScored: false,
        },
        {
          elementID: 6,
          hasScored: false,
        },
      ],
    });
  }

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string> {
    const worldToUse =
      worldID === 1
        ? this.smallWorld
        : worldID === 2
        ? this.bigWorld
        : this.newWorld;
    const elementType = worldToUse.world.elements.find(
      (element) => element.elementId === elementID
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
        return Promise.reject(
          "H5P elements are not supported in the backend mock."
        );
      case "video":
        //return Promise.resolve("https://youtu.be/8X4cDoM3R7E?t=189");
        return Promise.resolve("https://vimeo.com/782061723");
      // return Promise.resolve(
      //   "https://video.th-ab.de/paella/ui/watch.html?id=ed6695a8-f7ac-47dc-bf6d-62460b94383f"
      // );
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
            "/SampleLearningElementData/fktohneParamohneRueckgabeohneDeklaration.c"
        );
      case "pdf":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/testPDF.pdf"
        );
      case "quiz":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/testQuiz.json"
        );
      /* istanbul ignore next */
      default:
        throw new Error("Unknown element type");
    }
  }

  scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean> {
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
        {
          courseID: 3,
          courseName: "New World",
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

  loginUser(userCredentials: UserCredentialParams): Promise<string> {
    return Promise.resolve("fakeToken");
  }

  getWorldData({
    userToken,
    worldID,
  }: GetWorldDataParams): Promise<BackendWorldTO> {
    return Promise.resolve(
      BackendAdapterUtils.parseAWT(
        worldID === 1
          ? this.smallWorld
          : worldID === 2
          ? this.bigWorld
          : this.newWorld
      )
    );
  }

  smallWorld: AWT = {
    fileVersion: "0.4",
    amgVersion: "1.0",
    author: "Ricardo",
    language: "de",
    world: {
      worldName: "Small World",
      worldDescription:
        "Small World with only one topic and one space but with all elements",
      worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
      evaluationLink: "https://www.th-ab.de",
      topics: [
        {
          topicId: 7,
          topicName: "Themenbereich der kleinen Welt",
          topicContents: [1],
        },
      ],
      spaces: [
        {
          spaceId: 1,
          spaceName: "Raum der kleinen Welt",
          spaceDescription: "Raumbeschreibung der kleinen Welt",
          spaceSlotContents: [1, 2, 3, null, 4, null, null, 5, null, 6],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
          spaceGoals: ["Raumziel 1/3", "Raumziel 2/3", "Raumziel 3/3"],
          spaceTemplate: "L_32x31_10L",
          spaceTemplateStyle: "Arcade",
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
          elementModel: "l_trophy_bronze",
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
          elementModel: "",
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
          elementModel: "",
        },
        {
          elementId: 4,
          elementName: "Ein Quiz-Lernelement",
          elementCategory: "quiz",
          elementDescription: "Beschreibung des Quiz-Lernelements",
          elementGoals: [
            "Elementziel 1/3",
            "Elementziel 2/3",
            "Elementziel 3/3",
          ],
          elementFileType: "text",
          elementMaxScore: 1,
          elementModel: "",
          adaptivityElement: {
            adaptivityIntroText: "Hier wird das Adaptivitätselement erklärt",
            shuffleTasks: false,
            adaptivityTasks: [
              {
                adaptivityTaskId: 1,
                adaptivityTaskTitle: "Aufgabe 1 - Geografie",
                adaptivityTaskOptional: false,
                requiredDifficulty: 100,
                adaptivityQuestions: [
                  {
                    questionType: "singleResponse",
                    questionId: 1,
                    questionDifficulty: 100,
                    questionText: "Welches Land grenzt nicht an Deutschland?",
                    questionAnswers: [
                      {
                        answerIndex: 1,
                        answerText: "Dänemark",
                      },
                      {
                        answerIndex: 2,
                        answerText: "Norwegen",
                      },
                      {
                        answerIndex: 3,
                        answerText: "Polen",
                      },
                      {
                        answerIndex: 4,
                        answerText: "Tschechien",
                      },
                    ],
                    adaptivityRules: [
                      {
                        triggerId: 1,
                        triggerType: "correctnessTrigger",
                        triggerCondition: "correct",
                        triggerAction: {
                          actionType: "CommentAction",
                          actionData:
                            "Das war leider falsch, versuch es doch nochmal",
                        },
                      },
                      {
                        triggerId: 2,
                        triggerType: "correctnessTrigger",
                        triggerCondition: "incorrect",
                        triggerAction: {
                          actionType: "CommentAction",
                          actionData: "Das war richtig. Gut gemacht!",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          elementId: 999,
          elementName: "Ein externes Lernelement",
          elementCategory: "externalText",
          elementDescription: "Beschreibung des externen Lernelemenets",
          elementFileType: "text",
          elementMaxScore: 0,
          elementModel: "l_h5p_blackboard_1",
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
          elementModel: "l_h5p_blackboard_1",
        },
        {
          elementId: 6,
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
          elementModel: "l_h5p_drawingtable_1",
        },
      ],
    },
  };

  bigWorld: AWT = {
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
          spaceSlotContents: [1],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
          spaceTemplate: "",
          spaceTemplateStyle: "",
        },
        {
          spaceId: 2,
          spaceName: "Lernraum 2",
          spaceDescription: "rdescription2",
          spaceGoals: ["rgoals2"],
          spaceSlotContents: [2],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
          spaceTemplate: "",
          spaceTemplateStyle: "",
        },
        {
          spaceId: 3,
          spaceName: "Lernraum 3",
          spaceDescription: "rdescription3",
          spaceGoals: ["rgoals3"],
          spaceSlotContents: [3],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "",
          spaceTemplate: "",
          spaceTemplateStyle: "",
        },
        {
          spaceId: 4,
          spaceName: "  Lernraum 4",
          spaceDescription: "rdescription4",
          spaceGoals: ["rgoals4"],
          spaceSlotContents: [4],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "(3)v((2)^(1))",
          spaceTemplate: "",
          spaceTemplateStyle: "",
        },
        {
          spaceId: 5,
          spaceName: "Der lernraum 5",
          spaceDescription: "rdescription5",
          spaceGoals: ["rgoals5"],
          spaceSlotContents: [5],
          requiredPointsToComplete: 1,
          requiredSpacesToEnter: "4",
          spaceTemplate: "",
          spaceTemplateStyle: "",
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
          elementModel: "",
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
          elementModel: "",
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
          elementModel: "",
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
          elementModel: "",
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
          elementModel: "",
        },
      ],
    },
  };
  newWorld: AWT = {
    fileVersion: "0.4",
    amgVersion: "1.0.0",
    author: "Paul Erhard",
    language: "de",
    world: {
      worldName: "TestLernwelt0723",
      worldDescription:
        "Alle Funktionen in AdLer sind erfolgreich absolvierbar",
      worldGoals: [""],
      topics: [],
      spaces: [
        {
          spaceId: 1,
          spaceName: "Lernraum Bilder",
          spaceDescription: "",
          spaceGoals: [""],
          spaceSlotContents: [1, 2, 3, 4, null, null],
          requiredPointsToComplete: 2,
          requiredSpacesToEnter: "",
          spaceTemplate: "R_20X20_6L",
          spaceTemplateStyle: "Campus",
        },
        {
          spaceId: 2,
          spaceName: "Lernraum Videos",
          spaceDescription: "",
          spaceGoals: [""],
          spaceSlotContents: [5, 6, 7, null, null, null],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "1",
          spaceTemplate: "R_20X20_6L",
          spaceTemplateStyle: "Campus",
        },
        {
          spaceId: 3,
          spaceName: "Lernraum h5p",
          spaceDescription: "",
          spaceGoals: [""],
          spaceSlotContents: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          requiredPointsToComplete: 10,
          requiredSpacesToEnter: "(5)v(4)",
          spaceTemplate: "L_32X31_10L",
          spaceTemplateStyle: "Campus",
        },
        {
          spaceId: 4,
          spaceName: "Lernraum Random",
          spaceDescription: "",
          spaceGoals: [""],
          spaceSlotContents: [18, null, null, null, null, 19, null, 20],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "2",
          spaceTemplate: "R_20X30_8L",
          spaceTemplateStyle: "Campus",
        },
        {
          spaceId: 5,
          spaceName: "Lernraum Random 2",
          spaceDescription: "",
          spaceGoals: [""],
          spaceSlotContents: [null, 21, null, 22, null, 23],
          requiredPointsToComplete: 3,
          requiredSpacesToEnter: "(1)",
          spaceTemplate: "R_20X20_6L",
          spaceTemplateStyle: "Campus",
        },
      ],
      elements: [
        {
          elementId: 1,
          elementName: "Bild1",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "png",
          elementMaxScore: 1,
          elementModel: "l_picture_painting_2",
        },
        {
          elementId: 2,
          elementName: "Bild2",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "jpg",
          elementMaxScore: 1,
          elementModel: "l_picture_painting_1",
        },
        {
          elementId: 3,
          elementName: "Bild3(1)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "webp",
          elementMaxScore: 1,
          elementModel: "l_picture_painting_2",
        },
        {
          elementId: 4,
          elementName: "Bild4(1)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "jpeg",
          elementMaxScore: 1,
          elementModel: "l_picture_painting_1",
        },
        {
          elementId: 5,
          elementName: "YouTube",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 1,
          elementModel: "l_video_television_1",
        },
        {
          elementId: 6,
          elementName: "Vimeo",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 1,
          elementModel: "l_video_television_1",
        },
        {
          elementId: 7,
          elementName: "TH AB",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 1,
          elementModel: "l_video_television_1",
        },
        {
          elementId: 8,
          elementName: "\u00DCbung1",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_slotmachine_1",
        },
        {
          elementId: 9,
          elementName: "\u00DCbung2",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_deskpc_1",
        },
        {
          elementId: 10,
          elementName: "\u00DCbung3",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_blackboard_1",
        },
        {
          elementId: 11,
          elementName: "\u00DCbung4",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_drawingtable_1",
        },
        {
          elementId: 12,
          elementName: "\u00DCbung5",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_slotmachine_1",
        },
        {
          elementId: 13,
          elementName: "\u00DCbung6",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_deskpc_1",
        },
        {
          elementId: 14,
          elementName: "\u00DCbung7",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_deskpc_1",
        },
        {
          elementId: 15,
          elementName: "\u00DCbung8",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_blackboard_1",
        },
        {
          elementId: 16,
          elementName: "\u00DCbung9",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_drawingtable_1",
        },
        {
          elementId: 17,
          elementName: "\u00DCbung10",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_h5p_slotmachine_1",
        },
        {
          elementId: 18,
          elementName: "Bild3(2)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "png",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
        {
          elementId: 19,
          elementName: "Video4(1)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
        {
          elementId: 20,
          elementName: "Text1",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "text",
          elementFileType: "txt",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
        {
          elementId: 21,
          elementName: "H5P11",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "h5p",
          elementFileType: "h5p",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
        {
          elementId: 22,
          elementName: "Video4(2)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "video",
          elementFileType: "url",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
        {
          elementId: 23,
          elementName: "Bild4(2)",
          elementDescription: "",
          elementGoals: [""],
          elementCategory: "image",
          elementFileType: "webp",
          elementMaxScore: 1,
          elementModel: "l_random",
        },
      ],
    },
  };
}
