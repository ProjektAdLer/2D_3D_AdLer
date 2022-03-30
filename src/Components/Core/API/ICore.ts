import { H5PForCoursesAPIResponse } from "../Types/H5PTypes";

export default interface ICore {
  setupBabylon(canvas: HTMLCanvasElement): Promise<void>;
  setupMoodle(): Promise<void>;
  setupReact(): void;
  getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
