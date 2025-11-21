export default class LocalWorldInfoTO {
  constructor(
    public worldID: number,
    public worldName: string,
    public worldFolder: string,
    public elementCount: number,
    public sizeInBytes: number,
    public source: "indexeddb" | "public",
    public importTimestamp: number,
  ) {}
}
