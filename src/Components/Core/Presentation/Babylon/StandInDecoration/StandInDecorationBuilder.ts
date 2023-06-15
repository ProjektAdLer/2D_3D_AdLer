import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import StandInDecorationViewModel from "./StandInDecorationViewModel";
import StandInDecorationView from "./StandInDecorationView";
import IStandInDecorationPresenter from "./IStandInDecorationPresenter";
import StandInDecorationPresenter from "./StandInDecorationPresenter";

@injectable()
export default class StandInDecorationBuilder extends PresentationBuilder<
  StandInDecorationViewModel,
  undefined,
  StandInDecorationView,
  IStandInDecorationPresenter
> {
  constructor() {
    super(
      StandInDecorationViewModel,
      undefined,
      StandInDecorationView,
      StandInDecorationPresenter
    );
  }
}
