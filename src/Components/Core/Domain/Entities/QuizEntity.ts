import { ComponentID } from "../Types/EntityTypes";

export default class QuizEntity {
  public isSingleChoice: boolean;
  public question: string;
  public answerOptions: string[];
}
