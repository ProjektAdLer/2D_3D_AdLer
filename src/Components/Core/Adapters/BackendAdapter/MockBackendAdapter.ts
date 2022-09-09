import { injectable } from "inversify";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";
import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";
import IBackendAdapter, { tempApiInfo } from "./IBackendAdapter";
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
  getLearningWorldData({
    userToken,
    worldId,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>> {
    const learningWorldTO: Partial<LearningWorldTO> = {
      worldName: "MockWorld",
      worldGoal: "MockGoal",
      learningRooms: [
        {}, // This is nessesary because the LearningWorldPresenter expects an array of LearningRoomTOs with the first on reserved for the DSL file
        {
          id: 1,
          name: "MockRoom1",
          learningElements: [
            {
              id: 1,
              name: "MockH5P",
              value: 10,
              requirements: [],
              learningElementData: {
                type: "h5p",
                h5pContent: {
                  contextId: 123,
                  fileName: "Metriken Teil 1",
                },
              },
            } as LearningElementTO,
            {
              id: 2,
              name: "MockText",
              value: 10,
              requirements: [],
              learningElementData: {
                type: "text",
              },
            } as LearningElementTO,
            {
              id: 3,
              name: "MockImage",
              value: 10,
              requirements: [],
              learningElementData: {
                type: "image",
              },
            } as LearningElementTO,
            {
              id: 4,
              name: "MockVideo",
              value: 10,
              requirements: [],
              learningElementData: {
                type: "video",
              },
            } as LearningElementTO,
          ],
        } as LearningRoomTO,
      ],
    } as Partial<LearningWorldTO>;

    return Promise.resolve(learningWorldTO);
  }

  scoreLearningElement(learningElementId: number): Promise<void> {
    return Promise.resolve();
  }

  logInUser(userCredentials: UserCredentials): Promise<string> {
    return Promise.resolve("fakeToken");
  }
}
