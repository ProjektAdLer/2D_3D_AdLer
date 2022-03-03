import { inject, injectable } from "inversify";
import { resolve } from "path/posix";
import IMoodleData from "../../DataAccess/Moodle/IMoodleData";
import CORE_TYPES from "../../DependencyInjection/types";
import IMoodle from "./IMoodle";
const axios = require("axios").default;

@injectable()
export default class Moodle implements IMoodle {
  constructor(
    @inject(CORE_TYPES.IMoodleData) private moodleData: IMoodleData
  ) {}

  async setupMoodle(): Promise<void> {
    const test = await this.moodleData.signInUser(
      "Student",
      "wve2rxz7wfm3BPH-ykh"
    );

    console.log(test);
  }

  async getAllH5pForCourse(courseShortName: string): Promise<any> {
    const object = {
      wstoken: "fcc83dae37dad77bda91e3711d51b765",
      wsfunction: "mod_h5pactivity_get_attempts",
      h5pactivityid: "7",
      moodlewsrestformat: "json",
    };
    throw new Error("Method not implemented.");
  }
}
