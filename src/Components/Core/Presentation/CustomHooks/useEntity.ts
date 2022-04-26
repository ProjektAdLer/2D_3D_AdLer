import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import AbstractEntity from "../../Domain/Entities/AbstractEntity";
import ObservableClass from "../../Domain/EntityManager/Observables/ObservableClass";
import IEntityManager from "../../Domain/EntityManager/IEntityManager";

export default function useEntity<T extends AbstractEntity>(
  entityId: string,
  entityClass: { new (): T }
): [T] {
  const [data, setData] = useState<T>();
  let entityManager: IEntityManager = useInjection(CORE_TYPES.IEntityManager);

  let observableEntity: ObservableClass<T>;

  useEffect(() => {
    if (entityId) {
      observableEntity = entityManager.getEntityById<T>(entityId, entityClass);
      setData(observableEntity.Value);
      observableEntity.subscribe(setData);
    }

    return () => observableEntity.unsubscribe(setData);
  });

  return [data as T];
}
