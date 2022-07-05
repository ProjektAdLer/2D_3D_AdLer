import { MoodleTokenServerResponse } from "../../Types/MoodleTokenServerResponse";
import axios from "axios";
import { injectable } from "inversify";
import IMoodleDataAccess from "./IMoodleDataAccess";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

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

  async getAllH5pForCourse(
    courseId: number
  ): Promise<H5PForCoursesAPIResponse> {
    const response = await this.makeApiCall<H5PForCoursesAPIResponse>(
      "https://moodle.cluuub.xyz/webservice/rest/server.php",
      {
        wstoken: "b344c9c7b004e838410f22802fe5c0a1",
        wsfunction: "mod_h5pactivity_get_h5pactivities_by_courses",
        moodlewsrestformat: "json",
        "courseids[0]": courseId,
      }
    );

    return response;
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
