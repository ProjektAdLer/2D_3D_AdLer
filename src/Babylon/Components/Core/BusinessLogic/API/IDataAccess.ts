export default interface IDataAccess {
  signInUser(username: string, password: string): Promise<string>;
}
