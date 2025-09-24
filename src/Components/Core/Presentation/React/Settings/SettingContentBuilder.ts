import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import SettingContentViewModel from "./SettingContentViewModel";
import SettingContentController from "./SettingContentController";
import ISettingContentPresenter from "./ISettingContentPresenter";
import SettingContentPresenter from "./SettingContentPresenter";

@injectable()
export default class SettingContentBuilder extends PresentationBuilder<
  SettingContentViewModel,
  SettingContentController,
  undefined,
  ISettingContentPresenter
> {
  constructor() {
    super(
      SettingContentViewModel,
      SettingContentController,
      undefined,
      SettingContentPresenter,
    );
  }
}
