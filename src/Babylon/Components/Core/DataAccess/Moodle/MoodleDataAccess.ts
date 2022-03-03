import { MoodleTokenServerResponse } from "../../Types/MoodleTokenServerResponse";
import axios from "axios";
import { injectable } from "inversify";
import IMoodleDataAccess from "./IMoodleDataAccess";

@injectable()
export default class MoodleDataAccess implements IMoodleDataAccess {
  async signInUser(username: string, password: string): Promise<string> {
    const response = await this.makeApiCall<MoodleTokenServerResponse>(
      "https://moodle.cluuub.xyz/login/token.php",
      {
        username: username,
        password: password,
        service: "moodle_mobile_app",
      }
    );

    if (!response.token) {
      throw new Error("No token received from Moodle");
    }

    return response.token;
  }
  async makeApiCall<T>(
    siteUrl: string,
    requestData: Record<string, unknown>,
    token?: string,
    wsFunction?: string
  ): Promise<T> {
    const formData = new FormData();

    for (var key in requestData) {
      // @ts-ignore
      formData.append(key, requestData[key]);
    }
    token && formData.append("wstoken", token);

    const response = await axios.post<T>(siteUrl, formData, {
      headers: {
        "content-type": "text/plain",
      },
    });

    return response.data;
  }
}
