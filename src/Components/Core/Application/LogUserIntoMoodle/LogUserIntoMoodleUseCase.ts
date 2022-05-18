import { injectable } from "inversify";
import ILogUserIntoMoodleUseCase from "./ILogUserIntoMoodleUseCase";

@injectable()
export default class LogUserIntoMoodleUseCase
  implements ILogUserIntoMoodleUseCase
{
  executeAsync(data: { username: string; password: string }): Promise<void> {
    console.log(`Logging user ${data.username} into moodle`);
    return Promise.resolve();
  }
}
