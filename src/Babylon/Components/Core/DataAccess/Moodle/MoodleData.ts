import IMoodleData from "./IMoodleData";

export default class MoodleData implements IMoodleData {
  makeApiCall<T>(
    wsFunction: string,
    siteUrl: string,
    requestData: Record<string, unknown>,
    token: string
  ): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
