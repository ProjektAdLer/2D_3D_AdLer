export type APIBaseWarning = {
  item?: string;

  itemid?: number;

  warningcode: string;

  message: string;
};

export type APIBaseExternalFile = {
  fileurl: string;
  filename?: string;
  filepath?: string;
  filesize?: number;
  timemodified?: number;
  mimetype?: string;
  isexternalfile?: number;
  repositorytype?: string;
};
