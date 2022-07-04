import { LearningComponentID } from "./../../Types/EnitityTypes";
import { APIWorldTo } from "./APIWorldTO";
import { injectable } from "inversify";
import type IBackend from "./IBackend";

import { APILearningRoomTO } from "./APILearningRoomTO";
import { APILearningElementTO } from "./APILearningElementTO";

import axios from "axios";
import { logger } from "../../../../Lib/Logger";

@injectable()
export class FakeBackend implements IBackend {
  async logInUser(userCredentials: {
    username: string;
    password: string;
  }): Promise<string> {
    // const response = await axios.get<string>(
    //   "https://api.cluuub.xyz/userlogin"
    // );

    const token = await axios.post<string>(
      "https://api.cluuub.xyz/userlogin",
      userCredentials
    );

    return token.data;
    //return Promise.resolve(`${userCredentials.username}_token`);
  }
  scoreLearningElement(learningElementId: LearningComponentID): Promise<void> {
    logger.log(
      `Scoring learning element with id ${learningElementId} via FakeBackend`
    );
    return Promise.resolve();
  }
  getWorld(): Promise<Partial<APIWorldTo>> {
    return Promise.resolve(learningWorld);
  }

  getLearningRooms(): Promise<APILearningRoomTO[]> {
    return Promise.resolve(learningRooms);
  }

  getLearningElements(): Promise<APILearningElementTO[]> {
    //@ts-ignore
    return Promise.resolve(learningElements);
  }
}

const learningWorld = {
  name: "SWEGED: Metriken",
  description: "This is a fake world",
  learningRoommIds: [1],
};

const learningRooms = [
  {
    id: 1,
    name: "Room 1",
    learningElementIds: [2, 3],
  },
];

const learningElements = [
  {
    id: 2,
    identifier: {
      type: "name",
      value: "LOC complete",
    },
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [
      {
        type: "points",
        value: 5,
      },
    ],
    name: "H5P Lernelement",
  },
  {
    id: 3,
    identifier: {
      type: "name",
      value: "LOC complete",
    },
    elementType: "text",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [
      {
        type: "points",
        value: 5,
      },
    ],
    name: "Text Lernelement",
  },
  {
    id: 42,
    identifier: {
      type: "name",
      value: "LOC complete",
    },
    elementType: "video",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [
      {
        type: "points",
        value: 5,
      },
    ],
    name: "Video Lernelement",
  },
  {
    id: 4,
    identifier: {
      type: "name",
      value: "LOC complete",
    },
    elementType: "image",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [
      {
        type: "points",
        value: 5,
      },
    ],
    name: "Image Lernelement",
  },
];
