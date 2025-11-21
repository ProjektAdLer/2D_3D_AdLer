import { injectable } from "inversify";
import IWorldStorageAdapter from "../../Application/Ports/WorldStoragePort/IWorldStorageAdapter";
import LocalStore, { WorldMetadata } from "../LocalStore/LocalStore";

/**
 * Adapter that wraps LocalStore and implements IWorldStorageAdapter.
 * This allows the Application layer to use storage functionality without directly depending on LocalStore.
 */
@injectable()
export default class WorldStorageAdapter implements IWorldStorageAdapter {
  private localStore: LocalStore;

  constructor() {
    this.localStore = new LocalStore();
  }

  async init(): Promise<void> {
    await this.localStore.init();
  }

  async worldExists(worldID: number): Promise<boolean> {
    return await this.localStore.worldExists(worldID);
  }

  async saveWorldMetadata(
    worldID: number,
    metadata: Omit<WorldMetadata, "worldID">,
  ): Promise<void> {
    await this.localStore.saveWorldMetadata(worldID, metadata);
  }

  async getWorldMetadata(worldID: number): Promise<WorldMetadata | null> {
    return await this.localStore.getWorldMetadata(worldID);
  }

  async deleteWorld(worldID: number): Promise<void> {
    await this.localStore.deleteWorld(worldID);
  }

  async getAllWorlds(): Promise<WorldMetadata[]> {
    return await this.localStore.getAllWorlds();
  }

  async getWorldSize(worldID: number): Promise<number> {
    return await this.localStore.getWorldSize(worldID);
  }

  async getAllWorldSizes(): Promise<Map<number, number>> {
    return await this.localStore.getAllWorldSizes();
  }

  async getStorageInfo(): Promise<{
    used?: number;
    quota?: number;
    available?: number;
  }> {
    return await this.localStore.getStorageInfo();
  }

  async hasEnoughSpace(requiredBytes: number): Promise<boolean> {
    return await this.localStore.hasEnoughSpace(requiredBytes);
  }

  async saveFile(worldID: number, path: string, blob: Blob): Promise<void> {
    await this.localStore.saveFile(worldID, path, blob);
  }

  async getFile(worldID: number, path: string): Promise<Blob | null> {
    return await this.localStore.getFile(worldID, path);
  }
}
