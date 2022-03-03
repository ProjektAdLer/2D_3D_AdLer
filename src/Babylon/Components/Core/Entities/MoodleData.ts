import { injectable } from "inversify";

@injectable()
export default class MoodleData {
  private _token: string;

  set token(token: string) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }
}
