import { APIWorldTo } from "./APIWorldTO";
import { injectable } from "inversify";
import { type IBackend } from "./IBackend";

@injectable()
export class FakeBackend implements IBackend {
  getWorld(): Promise<APIWorldTo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Fake World from FakeApi",
          description: "This is a fake world",
        });
      }, 1000);
    });
  }
}
