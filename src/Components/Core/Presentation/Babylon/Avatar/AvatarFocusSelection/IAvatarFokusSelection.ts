import Observable from "src/Lib/Observable";
import IAvatarPresenter from "../IAvatarPresenter";
import IAvatarFocusable, { FocusalbeTypes } from "./IAvatarFocusable";

export default interface IAvatarFocusSelection {
  get CurrentFocus(): Observable<IAvatarFocusable | null>;
  registerAvatarPresenter(avatarPresenter: IAvatarPresenter): void;
  registerFocusable(focusable: IAvatarFocusable): void;
  isInFocus(focusable: IAvatarFocusable): boolean;
  // based on user interaction
  setSpecialFocus(
    id: number | undefined,
    type: FocusalbeTypes | undefined,
  ): void;
  hasSpecialFocus(): boolean;
}
