export default interface ISignInAndOutComponentController {
  login(username: string, password: string): void;
  logout(): void;
}
