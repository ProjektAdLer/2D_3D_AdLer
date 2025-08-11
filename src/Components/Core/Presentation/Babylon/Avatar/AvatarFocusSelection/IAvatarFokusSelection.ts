import Observable from "src/Lib/Observable";
import IAvatarPresenter from "../IAvatarPresenter";
import IAvatarFocusable, { FocusableTypes } from "./IAvatarFocusable";

export default interface IAvatarFocusSelection {
  get CurrentFocus(): Observable<IAvatarFocusable | null>;
  registerAvatarPresenter(avatarPresenter: IAvatarPresenter): void;
  registerFocusable(focusable: IAvatarFocusable): void;
  unregisterFocusable(focusable: IAvatarFocusable): void;
  isInFocus(focusable: IAvatarFocusable): boolean;
  // based on user interaction
  setStorySpecialFocus(type: FocusableTypes | undefined): void;
  setSpecialFocus(
    id: number | undefined,
    type: FocusableTypes | undefined,
  ): void;
  hasSpecialFocus(): boolean;
}
