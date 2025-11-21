import IWorldManagementAdapter from "../../../../Application/Ports/WorldManagementPort/IWorldManagementAdapter";

/**
 * Presenter interface for WorldManagerModal
 * Now extends IWorldManagementAdapter to receive data from Use Cases via Ports
 */
export default interface IWorldManagerModalPresenter
  extends IWorldManagementAdapter {}
