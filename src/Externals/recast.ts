import * as Recast from "recast-detour";

export let recastModule: any;
export const recastReadyPromise = new Promise((resolve) => {
  new Recast().then((res: unknown) => {
    recastModule = res;
    resolve(res);
  });
});
