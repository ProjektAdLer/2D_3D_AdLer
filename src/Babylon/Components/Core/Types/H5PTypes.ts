import { APIBaseExternalFile, APIBaseWarning } from "./APIBaseTypes";
export type H5PForCoursesAPIResponse = {
  h5pactivities: H5PData[];
  warnings?: APIBaseWarning[];
};

export type H5PData = {
  id: number; // The primary key of the record.
  course: number; // Course id this h5p activity is part of.
  name: string; // The name of the activity module instance.
  timecreated?: number; // Timestamp of when the instance was added to the course.
  timemodified?: number; // Timestamp of when the instance was last modified.
  intro: string; // H5P activity description.
  introformat: number; // Intro format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN).
  grade?: number; // The maximum grade for submission.
  displayoptions: number; // H5P Button display options.
  enabletracking: number; // Enable xAPI tracking.
  grademethod: number; // Which H5P attempt is used for grading.
  contenthash?: string; // Sha1 hash of file content.
  coursemodule: number; // Coursemodule.
  context: number; // Context ID.
  introfiles: APIBaseExternalFile[];
  package: APIBaseExternalFile[];
  deployedfile?: {
    filename?: string; // File name.
    filepath?: string; // File path.
    filesize?: number; // File size.
    fileurl: string; // Downloadable file url.
    timemodified?: number; // Time modified.
    mimetype?: string; // File mime type.
  };
};
