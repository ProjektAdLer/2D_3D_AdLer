import { ConstructorReference } from "../Core/Types/EntityManagerTypes";

export function filterEntitiesOfTypeMockImplUtil(
  returnValue: object[],
  filterFunction?: (entity: object) => boolean
) {
  return (
    entityType: ConstructorReference<object>,
    filter: (entity: object) => boolean
  ) => {
    filter(new entityType());
    if (filterFunction) filterFunction = filter;
    return returnValue;
  };
}
