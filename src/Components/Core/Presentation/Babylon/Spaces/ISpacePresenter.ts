import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";

export default interface ISpacePresenter extends ISpaceAdapter {
  dispose(): void;
}
