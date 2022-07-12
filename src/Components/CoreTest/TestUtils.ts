import { ConstructorReference } from "../Core/Types/EntityManagerTypes";

export function filterEntitiesOfTypeMockImplUtil<T extends object>(
  filterReturns: boolean[],
  returnValue: T[]
) {
  return <T>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ) => {
    filterReturns.push(filter(new entityType()));
    return returnValue;
  };
}
