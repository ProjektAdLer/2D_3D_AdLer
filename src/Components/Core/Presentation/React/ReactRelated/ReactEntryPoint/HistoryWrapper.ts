import { Location } from "history";
import history from "~ReactEntryPoint/history";

export enum LocationScope {
  homeScreen = "/",
  worldMenu = "worldmenu",
  spaceMenu = "spacemenu",
  spaceDisplay = "spacedisplay",
  avatarEditor = "avatarEditor",
  _sceneRendering = "_sceneRendering", // for presenter that need to be cleared between learning spaces
  _global = "_global",
}

export type LocationScopeStrings = keyof typeof LocationScope;

export class HistoryWrapper {
  public static currentLocationScope(): LocationScope {
    for (let location of Object.values(LocationScope)) {
      if (
        history.location.pathname.includes(location) &&
        location !== LocationScope.homeScreen
      ) {
        return location;
      }
    }
    return LocationScope.homeScreen;
  }

  public static readonly lastLocations: Location[] = [];

  public static setlastLocation(loc: Location): void {
    if (this.lastLocations.length === 1) {
      if (loc.pathname === this.lastLocations[0].pathname) {
        return;
      }
    }

    if (this.lastLocations.length === 2) {
      if (loc.pathname === this.lastLocations[1].pathname) {
        return;
      }
    }

    this.lastLocations.push(structuredClone(loc));
    if (this.lastLocations.length > 2) {
      this.lastLocations.shift();
    }
  }

  public static getlastLocation(): Location {
    return this.lastLocations[0];
  }
}
