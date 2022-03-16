import { useInjection, useContainer } from "inversify-react";
import { useState, useEffect } from "react";
import REACT_TYPES from "../DependencyInjection/ReactTypes";
import IEntityManager from "../../Core/BusinessLogic/EntityManager/IEntityManager";

export default function (): [boolean, (input: boolean) => void, () => void] {
  const [data, setData] = useState(false);
  let entityManager: IEntityManager = useInjection(REACT_TYPES.IEntityManager);
  useEffect(() => {
    entityManager.subscribeH5P(setData);
    setData(entityManager.H5PData);
  }, []);

  return [
    data,
    (input: boolean) => {
      entityManager.setShowH5P(input);
    },
    () => {
      entityManager.unsubscribeH5P(setData);
    },
  ];
}
