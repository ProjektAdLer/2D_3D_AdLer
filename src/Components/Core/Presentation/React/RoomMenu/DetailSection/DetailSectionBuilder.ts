import { injectable } from "inversify";
import DetailSectionPresenter from "./DetailSectionPresenter";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class DetailSectionBuilder extends PresentationBuilder<
  DetailSectionViewModel,
  undefined,
  undefined,
  IDetailSectionPresenter
> {
  constructor() {
    super(DetailSectionViewModel, undefined, undefined, DetailSectionPresenter);
  }
}
