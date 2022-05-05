import { injectable, inject } from "inversify";
import ILearningRoomController from "./ILearningRoomController";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import LearningRoomViewModel from "./LearningRoomViewModel";
import type ISceneController from "../SceneManagment/ISceneController";

@injectable()
export default class LearningRoomController
  implements ILearningRoomController {}
