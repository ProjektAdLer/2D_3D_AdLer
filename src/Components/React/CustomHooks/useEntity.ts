import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import INewEntityManager from "../../Core/BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";
import CORE_TYPES from "../../Core/DependencyInjection/CoreTypes";
import AbstractEntity from "../../Core/Entities/API/AbstractEntity";
import ObservableClass from "../../Core/BusinessLogic/EntityManager/Observables/ObservableClass";
import RootEntity from "../../Core/Entities/Entities/RootEntity";

export default function useEntity<T extends AbstractEntity>(
  entityId: string,
  entityClass: { new (): T }
): [T] {
  const [data, setData] = useState<T>();
  let entityManager: INewEntityManager = useInjection(
    CORE_TYPES.INewEntityManager
  );

  let observableEntity: ObservableClass<T>;

  useEffect(() => {
    observableEntity = entityManager.getEntityById<T>(entityId, entityClass);
    setData(observableEntity.Value);
    observableEntity.subscribe(setData);
    return () => observableEntity.unsubscribe(setData);
  });

  return [data as T];
}
