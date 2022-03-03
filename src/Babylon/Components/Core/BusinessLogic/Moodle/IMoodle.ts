export default interface IMoodle {
  setupMoodle(): Promise<void>;
  getAllH5pForCourse(courseShortName: string): Promise<any>; // TODO: Typing
}
