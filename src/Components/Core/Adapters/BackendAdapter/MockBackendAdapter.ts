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
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "../../Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "../../Domain/Types/LogLevelTypes";
import AdaptivityElementQuestionSubmissionTO from "../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementQuestionResponse from "./Types/AdaptivityElementQuestionResponse";
import AdaptivityElementStatusResponse from "./Types/AdaptivityElementStatusResponse";
import { AdaptivityElementStatusTypes } from "../../Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import {
  MockAdaptivityData,
  MockAdaptivityElementStatusResponse,
} from "./MockBackendData/MockAdaptivityData";
import SmallWorldAWT from "./MockBackendData/SmallWorldAWT";
import BigWorldAWT from "./MockBackendData/BigWorldAWT";
import NewWorldAWT from "./MockBackendData/NewWorldAWT";
import AWT from "./Types/AWT";

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
    if (worldID === 1) worldToUse = SmallWorldAWT;
    else if (worldID === 2) worldToUse = BigWorldAWT;
    else worldToUse = NewWorldAWT;

    const elementType = worldToUse.world.elements.find(
      (element) => element.elementId === elementID,
    )!.elementCategory;

    switch (elementType) {
      case "h5p":
      case "primitiveH5P":
        return Promise.reject(
          "H5P elements are not supported in the backend mock.",
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
            "/SampleLearningElementData/testBild.png",
        );
      case "text":
        return Promise.resolve(
          "http://" +
            window.location.host +
            "/SampleLearningElementData/fktohneParamohneRueckgabeohneDeklaration.c",
        );
      case "pdf":
        return Promise.resolve(
          "http://" +
            window.location.host +
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
    if (worldID === 1) worldToUse = SmallWorldAWT;
    else if (worldID === 2) worldToUse = BigWorldAWT;
    else worldToUse = NewWorldAWT;

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
}
