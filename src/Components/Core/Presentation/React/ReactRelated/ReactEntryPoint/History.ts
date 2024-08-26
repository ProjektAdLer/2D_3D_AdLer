import history from "history/browser";

export enum LocationScope {
  homeScreen = "/home",
  worldMenu = "/worldmenu",
  spaceMenu = "/spacemenu",
  spaceDisplay = "/spacedisplay",
  _global = "_global",
}

export type LocationScopeStrings = keyof typeof LocationScope;

export class History {
  public static currentLocationScope(): LocationScope {
    for (let location of Object.values(LocationScope)) {
      if (history.location.pathname.includes(location)) {
        return location;
      }
    }
    return LocationScope.homeScreen;
  }
}
