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
import { config } from "../../../../config";
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

// Theme Test Worlds - CampusAB, CampusKE, Company
import CampusAB_Main from "./MockBackendData/ThemeTestWorlds/CampusAB_Main";
import CampusAB_LearningArea from "./MockBackendData/ThemeTestWorlds/CampusAB_LearningArea";
import CampusAB_EatingArea from "./MockBackendData/ThemeTestWorlds/CampusAB_EatingArea";
import CampusAB_Presentation from "./MockBackendData/ThemeTestWorlds/CampusAB_Presentation";
import CampusAB_FnE from "./MockBackendData/ThemeTestWorlds/CampusAB_FnE";
import CampusAB_SocialArea from "./MockBackendData/ThemeTestWorlds/CampusAB_SocialArea";
import CampusAB_TechnicalArea from "./MockBackendData/ThemeTestWorlds/CampusAB_TechnicalArea";
import CampusKE_Main from "./MockBackendData/ThemeTestWorlds/CampusKE_Main";
import CampusKE_Mensa from "./MockBackendData/ThemeTestWorlds/CampusKE_Mensa";
import CampusKE_Library from "./MockBackendData/ThemeTestWorlds/CampusKE_Library";
import CampusKE_StudentClub from "./MockBackendData/ThemeTestWorlds/CampusKE_StudentClub";
import CampusKE_ServerRoom from "./MockBackendData/ThemeTestWorlds/CampusKE_ServerRoom";
import CampusKE_Labor from "./MockBackendData/ThemeTestWorlds/CampusKE_Labor";
import CampusKE_Auditorium from "./MockBackendData/ThemeTestWorlds/CampusKE_Auditorium";
import Company_LearningArea from "./MockBackendData/ThemeTestWorlds/Company_LearningArea";
import Company_EatingArea from "./MockBackendData/ThemeTestWorlds/Company_EatingArea";
import Company_Presentation from "./MockBackendData/ThemeTestWorlds/Company_Presentation";
import Company_FnE from "./MockBackendData/ThemeTestWorlds/Company_FnE";
import Company_SocialArea from "./MockBackendData/ThemeTestWorlds/Company_SocialArea";
import Company_TechnicalArea from "./MockBackendData/ThemeTestWorlds/Company_TechnicalArea";

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

  /**
   * Gets the appropriate world object based on worldID and showcase mode
   */
  private getWorld(worldID: number): AWT {
    // Showcase build: Only curated worlds available
    if (config.isShowcase) {
      if (worldID === 999) return ShowcaseWorldAWT;

      // All other worlds are not available in showcase mode
      throw new Error(
        `World ID ${worldID} is not available in showcase mode. Available: 999 (ShowcaseWorld only)`,
      );
    }

    // Development mode: All worlds available
    if (worldID === 1) return SimpleWorldAWT;
    else if (worldID === 2) return StoryWorldAWT;
    else if (worldID === 3) return ThemeWorldAWT;
    else if (worldID === 4) return NPCModelAWT;
    else if (worldID === 5) return RequirementsGradingAWT;
    else if (worldID === 999) return ShowcaseWorldAWT;
    // Theme Test Worlds (World IDs 10-49)
    // CampusAB
    else if (worldID === 10) return CampusAB_Main;
    else if (worldID === 11) return CampusAB_LearningArea;
    else if (worldID === 12) return CampusAB_EatingArea;
    else if (worldID === 13) return CampusAB_Presentation;
    else if (worldID === 14) return CampusAB_FnE;
    else if (worldID === 15) return CampusAB_SocialArea;
    else if (worldID === 16) return CampusAB_TechnicalArea;
    // CampusKE
    else if (worldID === 20) return CampusKE_Main;
    else if (worldID === 21) return CampusKE_Mensa;
    else if (worldID === 22) return CampusKE_Library;
    else if (worldID === 23) return CampusKE_StudentClub;
    else if (worldID === 24) return CampusKE_ServerRoom;
    else if (worldID === 25) return CampusKE_Labor;
    else if (worldID === 26) return CampusKE_Auditorium;
    // Company
    else if (worldID === 31) return Company_LearningArea;
    else if (worldID === 32) return Company_EatingArea;
    else if (worldID === 33) return Company_Presentation;
    else if (worldID === 34) return Company_FnE;
    else if (worldID === 35) return Company_SocialArea;
    else if (worldID === 36) return Company_TechnicalArea;

    return SubthemeWorldAWT;
  }

  /**
   * Get element source for Showcase world elements
   */
  private getShowcaseElementSource(elementID: number): Promise<string> {
    const publicUrl = process.env.PUBLIC_URL || "";
    const baseUrl =
      window.location.origin + publicUrl + "/SampleLearningElementData/";

    // Mapping for easier maintenance
    const showcaseElements: Record<number, string> = {
      1: "https://youtu.be/0hfMiMUI_HE",
      2: baseUrl + "Projektname.jpg",
      3: baseUrl + "Thema-und-Ziele",
      5: baseUrl + "Standorte.pdf",
      6: baseUrl + "Team.jpg",
      7: baseUrl + "Lernwelt-Allgemein.png",
      8: baseUrl + "Lernwelt",
      9: "https://youtu.be/CsV6FdHyltg",
      10: baseUrl + "Lernraum-Lernpfad.png",
      11: "https://youtu.be/9PPilIV71d8",
      12: "https://youtu.be/5AfULkLnROY",
      13: baseUrl + "Storyelement.pdf",
      14: baseUrl + "Lernelemente.pdf",
      15: baseUrl + "Adaptivitaetselement.pdf",
      16: baseUrl + "Lernpfade.jpg",
      17: baseUrl + "Storyelemente.pdf",
      18: baseUrl + "Moodle.txt",
      19: baseUrl + "3D-Lernumgebung",
      20: baseUrl + "Lernfortschritt.jpg",
      21: "https://youtu.be/8bcZdUicYeY",
      22: baseUrl + "Lernelemente.pdf",
      23: baseUrl + "3D_Adaptivitaetselement.pdf",
      24: "https://youtu.be/gG0RuXkE7ps",
    };

    if (elementID in showcaseElements) {
      return Promise.resolve(showcaseElements[elementID]);
    }

    return Promise.reject("Unknown element ID for Showcase world");
  }

  /**
   * Get element source for non-Showcase worlds
   */
  private getGenericElementSource(
    worldToUse: AWT,
    elementID: number,
  ): Promise<string> {
    const publicUrl = process.env.PUBLIC_URL || "";
    const baseUrl =
      window.location.origin + publicUrl + "/SampleLearningElementData/";

    const elementType = worldToUse.world.elements.find(
      (element) => element.elementId === elementID,
    )!.elementCategory;

    // Mapping for different element types
    const elementSources: Record<string, string> = {
      h5p:
        elementID === 5 || elementID === 9
          ? baseUrl + "Thema-und-Ziele"
          : baseUrl + "Lernwelt",
      primitiveH5P:
        elementID === 5 || elementID === 9
          ? baseUrl + "Thema-und-Ziele"
          : baseUrl + "Lernwelt",
      video: "https://vimeo.com/782061723",
      image: baseUrl + "Lernwelt-Allgemein.png",
      text: baseUrl + "Moodle.txt",
      pdf: baseUrl + "Standorte.pdf",
    };

    if (elementType in elementSources) {
      return Promise.resolve(elementSources[elementType]);
    }

    throw new Error("Unknown element type");
  }

  getElementSource({
    userToken,
    elementID,
    worldID,
  }: ElementDataParams): Promise<string> {
    try {
      const worldToUse = this.getWorld(worldID);

      // Special handling for ShowcaseWorld element IDs
      if (worldToUse === ShowcaseWorldAWT) {
        return this.getShowcaseElementSource(elementID);
      }

      return this.getGenericElementSource(worldToUse, elementID);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  scoreH5PElement(data: ScoreH5PElementParams): Promise<boolean> {
    // Real xAPI evaluation logic implementation
    const xapiEvent = data.rawH5PEvent;

    // Check the verb - "completed" or "answered" with correct result
    const isCompleted =
      xapiEvent.verb?.id === "http://adlnet.gov/expapi/verbs/completed";
    const isAnswered =
      xapiEvent.verb?.id === "http://adlnet.gov/expapi/verbs/answered";

    // For H5P Multiple Choice: Check the result
    if (isAnswered || isCompleted) {
      // Check if a result object exists and contains the success status
      const result = xapiEvent.result;
      if (result) {
        // If success is explicitly defined, use this value
        if (typeof result.success === "boolean") {
          console.log(
            "MockBackend H5P Scoring - success from xAPI:",
            result.success,
          );
          return Promise.resolve(result.success);
        }

        // Fallback: Check score-based evaluation
        if (result.score && typeof result.score.scaled === "number") {
          const success = result.score.scaled >= 0.6; // 60% or higher = success
          console.log(
            "MockBackend H5P Scoring - success from score:",
            success,
            "scaled:",
            result.score.scaled,
          );
          return Promise.resolve(success);
        }
      }
    }

    // Fallback for unknown event types or missing results
    console.log(
      "MockBackend H5P Scoring - no clear result, defaulting to false",
    );
    console.log("Event verb:", xapiEvent.verb?.id);
    console.log("Event result:", xapiEvent.result);
    return Promise.resolve(false);
  }

  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO> {
    // In showcase mode, only show curated worlds
    if (config.isShowcase) {
      return Promise.resolve({
        courses: [
          {
            courseID: 999,
            courseName: "AdLer Demo - Entdecke digitales Lernen 🚀",
          },
        ],
      });
    }

    // Development mode - all worlds including showcase for development
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
        // Theme Test Worlds - CampusAB
        { courseID: 10, courseName: "🎨 Campus AB - Main" },
        { courseID: 11, courseName: "🎨 Campus AB - Learning Area" },
        { courseID: 12, courseName: "🎨 Campus AB - Eating Area" },
        { courseID: 13, courseName: "🎨 Campus AB - Presentation" },
        { courseID: 14, courseName: "🎨 Campus AB - FnE" },
        { courseID: 15, courseName: "🎨 Campus AB - Social Area" },
        { courseID: 16, courseName: "🎨 Campus AB - Technical Area" },
        // Theme Test Worlds - CampusKE
        { courseID: 20, courseName: "🎨 Campus KE - Main" },
        { courseID: 21, courseName: "🎨 Campus KE - Mensa" },
        { courseID: 22, courseName: "🎨 Campus KE - Library" },
        { courseID: 23, courseName: "🎨 Campus KE - Student Club" },
        { courseID: 24, courseName: "🎨 Campus KE - Server Room" },
        { courseID: 25, courseName: "🎨 Campus KE - Labor" },
        { courseID: 26, courseName: "🎨 Campus KE - Auditorium" },
        // Theme Test Worlds - Company
        { courseID: 30, courseName: "🎨 Company - Main" },
        { courseID: 31, courseName: "🎨 Company - Learning Area" },
        { courseID: 32, courseName: "🎨 Company - Eating Area" },
        { courseID: 33, courseName: "🎨 Company - Presentation" },
        { courseID: 34, courseName: "🎨 Company - FnE" },
        { courseID: 35, courseName: "🎨 Company - Social Area" },
        { courseID: 36, courseName: "🎨 Company - Technical Area" },
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
    try {
      const worldToUse = this.getWorld(worldID);
      return Promise.resolve(BackendAdapterUtils.parseAWT(worldToUse));
    } catch (error) {
      return Promise.reject(error);
    }
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
    const backendTask = MockAdaptivityElementStatusResponse.tasks.find(
      (task) => task.taskId === response.gradedTask.taskId,
    );

    const backendQuestion = MockAdaptivityElementStatusResponse.questions.find(
      (question) => question.id === response.gradedQuestion.id,
    );

    if (!backendTask || !backendQuestion) return;

    backendQuestion.status = response.gradedQuestion.status;

    // If question is not correct, task is incorrect
    if (
      response.gradedQuestion.status !== AdaptivityElementStatusTypes.Correct
    ) {
      backendTask.taskStatus = AdaptivityElementStatusTypes.Incorrect;
      return;
    }

    // Check if task should be marked as complete
    const isTaskComplete = this.isTaskComplete(backendTask.taskId);
    const isRequiredQuestionCorrect = this.isRequiredQuestionCorrect(
      backendTask.taskId,
      backendQuestion.id,
    );

    // Mark task as complete if all questions correct OR a required question is correct
    if (isTaskComplete || isRequiredQuestionCorrect) {
      backendTask.taskStatus = AdaptivityElementStatusTypes.Correct;
      response.gradedTask.taskStatus = AdaptivityElementStatusTypes.Correct;
    }

    // Check if entire element is complete (all required tasks correct)
    if (this.areAllRequiredTasksComplete()) {
      response.elementScore.success = true;
      MockAdaptivityElementStatusResponse.element.success = true;
    }
  }

  /**
   * Checks if all questions in a task are correctly answered
   */
  private isTaskComplete(taskId: number): boolean {
    const task = MockAdaptivityData.adaptivityTasks.find(
      (t) => t.taskId === taskId,
    );
    if (!task) return false;

    return task.adaptivityQuestions.every((question) => {
      const q = MockAdaptivityElementStatusResponse.questions.find(
        (q) => q.id === question.questionId,
      );
      return q?.status === AdaptivityElementStatusTypes.Correct;
    });
  }

  /**
   * Checks if a required question is correctly answered
   */
  private isRequiredQuestionCorrect(
    taskId: number,
    questionId: number,
  ): boolean {
    const task = MockAdaptivityData.adaptivityTasks.find(
      (t) => t.taskId === taskId,
    );
    if (!task) return false;

    const question = task.adaptivityQuestions.find(
      (q) => q.questionId === questionId,
    );
    if (!question) return false;

    const taskDifficulty = task.requiredDifficulty;
    const questionDifficulty = question.questionDifficulty;

    if (taskDifficulty === undefined || questionDifficulty === undefined) {
      return false;
    }

    return questionDifficulty >= taskDifficulty;
  }

  /**
   * Checks if all required tasks are complete
   */
  private areAllRequiredTasksComplete(): boolean {
    const requiredTasks = MockAdaptivityElementStatusResponse.tasks.filter(
      (task) => {
        const rt = MockAdaptivityData.adaptivityTasks.find(
          (t) => t.taskId === task.taskId && t.optional === false,
        );
        return rt !== undefined;
      },
    );

    return requiredTasks.every((task) => task.taskStatus === "Correct");
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
