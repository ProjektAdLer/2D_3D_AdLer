import Observable from "src/Lib/Observable";

export default class CookieModalViewModel {
  cookieConsent: Observable<"accepted" | "declined" | null> = new Observable<
    "accepted" | "declined" | null
  >(null);
}
