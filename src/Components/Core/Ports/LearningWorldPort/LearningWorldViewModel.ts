import { injectable } from "inversify";
import Observable from "../../../../Lib/Observable";

@injectable()
export default class LearningWorldViewModel {
  public id: string;

  public worldName = new Observable<string>("");
  public worldNameLoading = new Observable<boolean>(false);
}
