export default interface IMoodleData {
  makeApiCall<T>(
    siteUrl: string,
    requestData: Record<string, unknown>,
    token?: string,
    wsFunction?: string
  ): Promise<T>;

  signInUser(username: string, password: string): Promise<string>;
}
