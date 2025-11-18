import { injectable } from "inversify";
import ILocalStoragePort from "../../Application/Ports/Interfaces/ILocalStoragePort";

@injectable()
export default class LocalStoragePort implements ILocalStoragePort {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
