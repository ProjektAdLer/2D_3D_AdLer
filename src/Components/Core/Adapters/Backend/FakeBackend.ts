import { APIWorldTo } from "./APIWorldTO";
import { injectable } from "inversify";
import { type IBackend } from "./IBackend";

import { APILearningRoomTO } from "./APILearningRoomTO";
import { APILearningElementTO } from "./APILearningElementTO";

@injectable()
export class FakeBackend implements IBackend {
  getWorld(): Promise<Partial<APIWorldTo>> {
    return Promise.resolve(learningWorld);
  }

  getLearningRooms(): Promise<APILearningRoomTO[]> {
    return Promise.resolve(learningRooms);
  }

  getLearningElements(): Promise<APILearningElementTO[]> {
    return Promise.resolve(learningElements);
  }
}

const learningWorld = {
  name: "Fake World from FakeApi",
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
];
