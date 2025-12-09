import IMenuHeaderBarController from "./IMenuHeaderBarController";
import history from "~ReactEntryPoint/history";

export default class MenuHeaderBarController
  implements IMenuHeaderBarController
{
  onHomeButtonClicked(): void {
    history.push("/");
  }

  onLearningWorldButtonClicked(): void {
    history.push("/worldmenu");
  }

  onBackButtonClicked(): void {
    history.back();
  }
}
