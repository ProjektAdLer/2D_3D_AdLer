import IRoomPresenter from "./IRoomPresenter";

export default interface IRoomFactory {
  createRoom(): IRoomPresenter;
}
