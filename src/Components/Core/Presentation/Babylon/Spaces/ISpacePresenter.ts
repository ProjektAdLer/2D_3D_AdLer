import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

export default interface ISpacePresenter extends IWorldAdapter {
  dispose(): void;
}
