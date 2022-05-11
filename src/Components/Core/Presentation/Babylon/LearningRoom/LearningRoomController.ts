import { injectable } from "inversify";
import ILearningRoomController from "./ILearningRoomController";

@injectable()
export default class LearningRoomController
  implements ILearningRoomController {}
