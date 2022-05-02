import { injectable } from "inversify";

@injectable()
export default class LearningWorldViewModel {
  public id: string;
  public worldName: string;
}
