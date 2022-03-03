import IMoodle from "./IMoodle";

export default class Moodle implements IMoodle {
  setupMoodle(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllH5pForCourse(courseShortName: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
