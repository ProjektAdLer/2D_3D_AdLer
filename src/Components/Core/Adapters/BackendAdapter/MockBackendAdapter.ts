import { injectable } from "inversify";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";
import LearningElementScoreTO from "../../Application/DataTransferObjects/LearningElementScoreTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";
import BackendAdapterUtils from "./BackendAdapterUtils";
import IBackendPort, {
  ElementDataParams,
  GetWorldDataParams,
  ScoreH5PElementParams,
  UserCredentialParams,
} from "../../Application/Ports/Interfaces/IBackendPort";
import LearningWorldStatusTO from "../../Application/DataTransferObjects/LearningWorldStatusTO";
import AdaptivityElementQuestionSubmissionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementQuestionResponse from "./Types/AdaptivityElementQuestionResponse";
import AdaptivityElementStatusResponse from "./Types/AdaptivityElementStatusResponse";
import { AdaptivityElementStatusTypes } from "../../Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import {
  MockAdaptivityData,
  MockAdaptivityElementStatusResponse,
} from "./MockBackendData/MockAdaptivityData";
import ThemeWorldAWT from "./MockBackendData/ThemeWorldAWT";
import StoryWorldAWT from "./MockBackendData/StoryWorldAWT";
import AWT from "./Types/AWT";
import { BackendAvatarConfigTO } from "../../Application/DataTransferObjects/BackendAvatarConfigTO";
import SimpleWorldAWT from "./MockBackendData/SimpleWorldAWT";
import SubthemeWorldAWT from "./MockBackendData/SubthemeWorldAWT";
import RequirementsGradingAWT from "./MockBackendData/RequirementsGradingAWT";
import NPCModelAWT from "./MockBackendData/NPCModelAWT";
import ShowcaseWorldAWT from "./MockBackendData/ShowcaseWorldAWT";

@injectable()
export default class MockBackendAdapter implements IBackendPort {
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
    worldID: ComponentID,
  ): Promise<LearningWorldStatusTO> {
    return Promise.resolve({
      worldID: worldID,
      elements: [
        {
          elementID: 1,
          hasScored: false,
        },
        {
          elementID: 2,
          hasScored: false,
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
    let worldToUse: AWT;
    if (worldID === 1) worldToUse = ThemeWorldAWT;
    else if (worldID === 2) worldToUse = StoryWorldAWT;
    else if (worldID === 3) worldToUse = SubthemeWorldAWT;
    else if (worldID === 4) worldToUse = NPCModelAWT;
    else if (worldID === 5) worldToUse = RequirementsGradingAWT;
    else worldToUse = SimpleWorldAWT;

    const elementType = worldToUse.world.elements.find(
      (element) => element.elementId === elementID,
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
      case "primitiveH5P":
        // Für H5P-Elemente geben wir die URL zum H5P-Ordner zurück
        if (elementID === 5) {
          // Multiple Choice Demo H5P-Element
          return Promise.resolve(
            window.location.origin +
              (process.env.PUBLIC_URL || "") +
              "/SampleLearningElementData/MultipleChoiceDemo",
          );
        }
        // Fallback für andere H5P-Elemente
        return Promise.resolve(
          window.location.origin +
            (process.env.PUBLIC_URL || "") +
            "/SampleLearningElementData/MultipleChoiceDemo",
        );
      case "video":
        //return Promise.resolve("https://youtu.be/8X4cDoM3R7E?t=189");
        return Promise.resolve("https://vimeo.com/782061723");
      // return Promise.resolve(
      //   "https://video.th-ab.de/paella/ui/watch.html?id=ed6695a8-f7ac-47dc-bf6d-62460b94383f"
      // );
      case "image":
        return Promise.resolve(
          window.location.origin +
            (process.env.PUBLIC_URL || "") +
            "/SampleLearningElementData/testBild.png",
        );
      case "text":
        return Promise.resolve(
          window.location.origin +
            (process.env.PUBLIC_URL || "") +
            "/SampleLearningElementData/fktohneParamohneRueckgabeohneDeklaration.c",
        );
      case "pdf":
        return Promise.resolve(
          window.location.origin +
            (process.env.PUBLIC_URL || "") +
            "/SampleLearningElementData/testPDF.pdf",
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
    // In Showcase-Modus nur die Showcase-Welt anzeigen
    if (process.env.REACT_APP_IS_SHOWCASE === "true") {
      return Promise.resolve({
        courses: [
          {
            courseID: 999,
            courseName: "AdLer Demo - Entdecke digitales Lernen 🚀",
          },
        ],
      });
    }

    // Normale Entwicklungslogik - alle Welten inklusive Showcase für Development
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
          courseName: "Subtheme World",
        },
        {
          courseID: 4,
          courseName: "New World",
        },
        { courseID: 5, courseName: "Requirements-Grading" },
        {
          courseID: 999,
          courseName: "AdLer Demo (Development)",
        },
      ],
    });
  }

  scoreElement(
    userToken: string,
    elementID: ComponentID,
    courseID: ComponentID,
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
    let worldToUse: AWT;

    // In Showcase-Modus verwenden wir standardmäßig die ShowcaseWorld
    if (process.env.REACT_APP_IS_SHOWCASE === "true") {
      worldToUse = ShowcaseWorldAWT;
    } else {
      // Normale Entwicklungslogik
      if (worldID === 1) worldToUse = SimpleWorldAWT;
      else if (worldID === 2) worldToUse = StoryWorldAWT;
      else if (worldID === 3) worldToUse = ThemeWorldAWT;
      else if (worldID === 4) worldToUse = NPCModelAWT;
      else if (worldID === 5) worldToUse = RequirementsGradingAWT;
      else if (worldID === 999) worldToUse = ShowcaseWorldAWT;
      else worldToUse = SubthemeWorldAWT;
    }

    return Promise.resolve(BackendAdapterUtils.parseAWT(worldToUse));
  }

  getAdaptivityElementQuestionResponse(
    userToken: string,
    worldID: number,
    submissionData: AdaptivityElementQuestionSubmissionTO,
  ): Promise<AdaptivityElementQuestionResponse> {
    const backendResponse: AdaptivityElementQuestionResponse = {
      elementScore: {
        elementId: submissionData.elementID,
        success: false,
      },
      gradedTask: {
        taskId: submissionData.taskID,
        taskStatus: "Incorrect",
      },
      gradedQuestion: {
        id: submissionData.questionID,
        status: "Incorrect",
        answers: null!,
      },
    };

    const id = submissionData.questionID;

    if (id === 0 || id === 2) {
      if (
        submissionData.selectedAnswers.filter((selected) => selected === true)
          .length === 1 &&
        submissionData.selectedAnswers[1] === true
      ) {
        backendResponse.gradedQuestion.status = "Correct";
      }
    } else if (id === 3) {
      if (
        submissionData.selectedAnswers.filter((selected) => selected === true)
          .length === 1 &&
        submissionData.selectedAnswers[0] === true
      ) {
        backendResponse.gradedQuestion.status = "Correct";
      }
    } else if (id > 0 && id < 12) {
      if (
        submissionData.selectedAnswers.filter((selected) => selected === true)
          .length === 2 &&
        submissionData.selectedAnswers[0] === true &&
        submissionData.selectedAnswers[1] === true
      ) {
        backendResponse.gradedQuestion.status = "Correct";
      }
    }
    submissionData.selectedAnswers.forEach((selected) => {
      if (selected) {
        if (backendResponse.gradedQuestion.answers === null) {
          backendResponse.gradedQuestion.answers = [
            {
              checked: true,
              correct: true,
            },
          ];
        } else
          backendResponse.gradedQuestion.answers!.push({
            checked: true,
            correct: true,
          });
      } else {
        if (backendResponse.gradedQuestion.answers === null) {
          backendResponse.gradedQuestion.answers = [
            {
              checked: false,
              correct: false,
            },
          ];
        } else
          backendResponse.gradedQuestion.answers!.push({
            checked: false,
            correct: false,
          });
      }
    });

    this.updateFakeBackEnd(backendResponse);

    return Promise.resolve(backendResponse);
  }

  getAdaptivityElementStatusResponse({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<AdaptivityElementStatusResponse> {
    return Promise.resolve(MockAdaptivityElementStatusResponse);
  }

  private updateFakeBackEnd(response: AdaptivityElementQuestionResponse) {
    const BackendTask = MockAdaptivityElementStatusResponse.tasks.find(
      (task) => task.taskId === response.gradedTask.taskId,
    );

    const BackendQuestion = MockAdaptivityElementStatusResponse.questions.find(
      (question) => question.id === response.gradedQuestion.id,
    );

    BackendQuestion!.status = response.gradedQuestion.status;

    if (
      response.gradedQuestion.status !== AdaptivityElementStatusTypes.Correct
    ) {
      BackendTask!.taskStatus = AdaptivityElementStatusTypes.Incorrect;
      return;
    }

    // check if task of AE is complete
    const currentTask = MockAdaptivityData.adaptivityTasks.find(
      (t) => t.taskId === BackendTask?.taskId,
    );

    const isTaskComplete = currentTask!.adaptivityQuestions.every(
      (question) => {
        const q = MockAdaptivityElementStatusResponse.questions.find(
          (q) => q.id === question.questionId,
        );
        return q!.status === AdaptivityElementStatusTypes.Correct;
      },
    );

    if (isTaskComplete) {
      BackendTask!.taskStatus = AdaptivityElementStatusTypes.Correct;
      response.gradedTask.taskStatus = AdaptivityElementStatusTypes.Correct;
    } else {
      BackendTask!.taskStatus = AdaptivityElementStatusTypes.Incorrect;
    }

    if (!isTaskComplete) {
      // check if required question answered correct
      const currentQuestion = currentTask?.adaptivityQuestions.find(
        (q) => q.questionId === BackendQuestion?.id,
      );

      const taskDifficulty = MockAdaptivityData.adaptivityTasks.find(
        (t) => t.taskId === BackendTask?.taskId,
      )!.requiredDifficulty;

      const questionDifficulty = MockAdaptivityData.adaptivityTasks
        .flatMap((task) => {
          return task.adaptivityQuestions.find(
            (question) => question.questionId === currentQuestion?.questionId,
          )?.questionDifficulty;
        })
        .filter((e) => e !== undefined)[0];

      if (
        questionDifficulty &&
        taskDifficulty &&
        questionDifficulty >= taskDifficulty
      ) {
        BackendTask!.taskStatus = AdaptivityElementStatusTypes.Correct;
        response.gradedTask.taskStatus = AdaptivityElementStatusTypes.Correct;
      }
    }

    // check if every required task is complete
    const RequiredTasks = MockAdaptivityElementStatusResponse.tasks.filter(
      (task) => {
        const rt = MockAdaptivityData.adaptivityTasks.filter(
          (t) => t.optional === false,
        );
        const r = rt.find((t) => t.taskId === task.taskId);
        return r;
      },
    );

    const isEveryTaskComplete = RequiredTasks.every((task) => {
      return task.taskStatus === "Correct";
    });

    if (isEveryTaskComplete) {
      response.elementScore.success = true;
      MockAdaptivityElementStatusResponse.element.success = true;
    }
  }

  // Avatar Config

  async getAvatarConfig(userToken: string): Promise<BackendAvatarConfigTO> {
    return Promise.resolve({
      // Face (all texture indices)
      eyes: "Neural_Eyes_1",
      nose: "Nose_1",
      mouth: "Mouth_1",
      eyebrows: "Brows_1",

      // Hair
      hair: "hair-medium-ponytail",
      beard: "beard-medium-anchor",
      hairColor: 8,

      // Accessories
      headgear: "none",
      glasses: "glasses-browline",
      backpack: "none",
      other: "none",

      // Clothes
      shirt: "shirts-sweatshirt",
      pants: "pants-jeans",
      shoes: "shoes-trainers",

      // Body
      skinColor: 24,
      roundness: 0.5, // 0-1 morph target weight
      // TODO: add more body features
    } as BackendAvatarConfigTO);
  }

  async updateAvatarConfig(
    userToken: string,
    avatarConfig: BackendAvatarConfigTO,
  ): Promise<boolean> {
    return true;
  }
}
