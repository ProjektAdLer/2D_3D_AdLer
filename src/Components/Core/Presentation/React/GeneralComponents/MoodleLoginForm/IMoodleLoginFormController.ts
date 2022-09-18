export default interface IMoodleLoginFormController {
  loginAsync(username: string, password: string): Promise<void>;
}
