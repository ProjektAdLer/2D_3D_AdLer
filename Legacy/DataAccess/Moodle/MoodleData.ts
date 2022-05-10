import { injectable } from "inversify";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

@injectable()
export default class MoodleData {
  private _token: string;

  private _h5ps: H5PForCoursesAPIResponse;

  set token(token: string) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }

  set h5ps(h5ps: H5PForCoursesAPIResponse) {
    this._h5ps = h5ps;
  }

  get h5ps(): H5PForCoursesAPIResponse {
    return this._h5ps;
  }
}
