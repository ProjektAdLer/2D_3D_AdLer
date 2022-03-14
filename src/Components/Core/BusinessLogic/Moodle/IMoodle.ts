import MoodleData from "../../Entities/MoodleData";

export default interface IMoodle {
  moodleData: MoodleData;
  setupMoodle(): Promise<void>;
  getAllH5pForCourse(courseId: number): Promise<any>; // TODO: Typing
}
