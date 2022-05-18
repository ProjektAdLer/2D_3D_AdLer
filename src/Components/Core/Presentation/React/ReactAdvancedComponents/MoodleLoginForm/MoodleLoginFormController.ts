import IMoodleLoginFormController from "./IMoodleLoginFormController";

export default class MoodleLoginFormController
  implements IMoodleLoginFormController
{
  async loginAsync(username: string, password: string): Promise<void> {
    console.log("Hallo aus dem Controller");
  }
}
