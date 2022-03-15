import { useInjection } from "inversify-react";
import { useState } from "react";
import REACT_TYPES from "../DependencyInjection/ReactTypes";
import IEntityManager from "../Entities/IEntityManager";
export default function (initialString: string) {
  const [data, setData] = useState(initialString);

  const entityManager: IEntityManager = useInjection(
    REACT_TYPES.IEntityManager
  );

  entityManager.setTestSubscription(setData);

  return [data, setData];
}
