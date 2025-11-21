/**
 * World metadata Transfer Object
 * Represents metadata for a learning world stored in IndexedDB
 */
export default class WorldMetadataTO {
  constructor(
    public worldID: number,
    public worldName: string,
    public worldFolder: string,
    public importTimestamp: number,
    public elementCount?: number,
  ) {}
}
