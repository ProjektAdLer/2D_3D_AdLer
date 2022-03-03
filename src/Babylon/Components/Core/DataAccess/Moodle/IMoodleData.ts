export default interface IMoodleData {
  makeApiCall<T>(
    wsFunction: string,
    siteUrl: string,
    requestData: Record<string, unknown>,
    token: string
  ): Promise<T>;
}
