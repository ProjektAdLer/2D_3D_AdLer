import { injectable } from "inversify";
import CookieModalController from "./CookieModalController";
import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class CookieModalBuilder extends PresentationBuilder<
  CookieModalViewModel,
  ICookieModalController,
  undefined,
  undefined
> {
  constructor() {
    super(CookieModalViewModel, CookieModalController, undefined, undefined);
  }
}
