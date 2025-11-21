import { injectable } from "inversify";
import IWorldStorageAdapter from "../../Application/Ports/WorldStoragePort/IWorldStorageAdapter";
import WorldMetadataTO from "../../Application/DataTransferObjects/WorldMetadataTO";
import LocalStore, { WorldMetadata } from "../LocalStore/LocalStore";

/**
 * Adapter that wraps LocalStore and implements IWorldStorageAdapter.
 * This allows the Application layer to use storage functionality without directly depending on LocalStore.
 * Converts between LocalStore's WorldMetadata and Application layer's WorldMetadataTO.
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
    metadata: Omit<WorldMetadataTO, "worldID">,
  ): Promise<void> {
    // Convert TO to LocalStore format
    const localStoreMetadata: Omit<WorldMetadata, "worldID"> = {
      worldName: metadata.worldName,
      worldFolder: metadata.worldFolder,
      importTimestamp: metadata.importTimestamp,
      elementCount: metadata.elementCount,
    };
    await this.localStore.saveWorldMetadata(worldID, localStoreMetadata);
  }

  async getWorldMetadata(worldID: number): Promise<WorldMetadataTO | null> {
    const metadata = await this.localStore.getWorldMetadata(worldID);
    if (!metadata) return null;

    // Convert LocalStore format to TO
    return new WorldMetadataTO(
      metadata.worldID,
      metadata.worldName,
      metadata.worldFolder,
      metadata.importTimestamp,
      metadata.elementCount,
    );
  }

  async deleteWorld(worldID: number): Promise<void> {
    await this.localStore.deleteWorld(worldID);
  }

  async getAllWorlds(): Promise<WorldMetadataTO[]> {
    const worlds = await this.localStore.getAllWorlds();
    // Convert all LocalStore formats to TOs
    return worlds.map(
      (world) =>
        new WorldMetadataTO(
          world.worldID,
          world.worldName,
          world.worldFolder,
          world.importTimestamp,
          world.elementCount,
        ),
    );
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

  async getAllFiles(worldID: number): Promise<{ path: string; blob: Blob }[]> {
    return await this.localStore.getAllFiles(worldID);
  }
}
