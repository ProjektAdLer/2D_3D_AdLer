export default interface IMoodle {
  setupMoodle(): Promise<void>;
  getAllH5pForCourse(courseId: number): Promise<any>; // TODO: Typing
}
