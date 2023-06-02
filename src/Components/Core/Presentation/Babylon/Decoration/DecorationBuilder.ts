import { injectable } from "inversify";
import DecorationPresenter from "./DecorationPresenter";
import DecorationView from "./DecorationView";
import DecorationViewModel from "./DecorationViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import IDecorationPresenter from "./IDecorationPresenter";

@injectable()
export default class DecorationBuilder extends PresentationBuilder<
  DecorationViewModel,
  undefined,
  DecorationView,
  IDecorationPresenter
> {
  constructor() {
    super(DecorationViewModel, undefined, DecorationView, DecorationPresenter);
  }
}
