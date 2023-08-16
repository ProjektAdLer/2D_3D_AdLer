import { inject, injectable } from "inversify";
import IUpdateQuizElementUseCase from "./IUpdateQuizElementUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";

// @injectable
// export default class UpdateQuizElementUseCase
//   implements IUpdateQuizElementUseCase
// {
//   constructor(
//     @inject(PORT_TYPES.ILearningWorldPort)
//     private worldPort: ILearningWorldPort
//   ) {}

//   async executeAsync(data: void): Promise<void> {
//     return Promise.resolve();
//   }
// }
