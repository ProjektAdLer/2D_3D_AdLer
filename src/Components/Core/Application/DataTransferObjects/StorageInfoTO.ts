export default class StorageInfoTO {
  constructor(
    public used: number,
    public quota: number,
    public available: number,
    public usedFormatted: string,
    public quotaFormatted: string,
    public usedPercent: number,
  ) {}
}
