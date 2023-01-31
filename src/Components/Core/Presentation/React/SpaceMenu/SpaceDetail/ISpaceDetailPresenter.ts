import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

export default interface ISpaceDetailPresenter
  extends ISpaceAdapter,
    IWorldAdapter {}
