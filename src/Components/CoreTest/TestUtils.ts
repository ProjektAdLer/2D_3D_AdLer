import { ConstructorReference } from "../Core/Types/EntityManagerTypes";

export function filterEntitiesOfTypeMockImplUtil<T extends object>(
  returnValue: T[],
  filterFunction?: (entity: T) => boolean
) {
  return (
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ) => {
    filter(new entityType());
    if (filterFunction) filterFunction = filter;
    return returnValue;
  };
}
