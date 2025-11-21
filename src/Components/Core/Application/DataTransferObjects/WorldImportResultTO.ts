export default class WorldImportResultTO {
  constructor(
    public success: boolean,
    public worldID: number,
    public worldName: string,
    public elementCount: number,
    public sizeInBytes: number,
    public errors: string[],
    public warnings: string[],
  ) {}
}
