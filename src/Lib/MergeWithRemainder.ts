import { ConstructorReference } from "src/Components/Core/Types/EntityManagerTypes";

export type Diff<TFrom, TTo> = Pick<TTo, Exclude<keyof TTo, keyof TFrom>>;

/**
 * Merges the properties of TTo into TFrom.
 * If a property is already present in TFrom, it will be overwritten.
 * Properties, that are not present in TFrom, have to be added in diffParams
 * @param dest The destination object
 * @param source The source object
 * @param diffParams The parameters missing in the source object and required in the destination object
 * @returns The merged object
 */
export const mergeObjectsWithRemainder = <TFrom, TTO>(
  dest: ConstructorReference<TTO extends object ? TTO : never>,
  source: TFrom extends object ? Partial<TFrom> : never,
  diffParams: Diff<TFrom, TTO> & Partial<TFrom & TTO>
): TTO => {
  let retVal = new dest();

  Object.assign(retVal, source, diffParams);

  return retVal;
};
