import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MoodleButtonPresenter from "./MoodleButtonPresenter";
import MoodleButtonViewModel from "./MoodleButtonViewModel";

@injectable()
export default class MoodleButtonBuilder extends PresentationBuilder<
  MoodleButtonViewModel,
  undefined,
  undefined,
  MoodleButtonPresenter
> {
  constructor() {
    super(MoodleButtonViewModel, undefined, undefined, MoodleButtonPresenter);
  }
}
