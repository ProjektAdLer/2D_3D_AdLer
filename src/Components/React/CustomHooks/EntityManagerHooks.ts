import { useInjection } from "inversify-react";
import { useState, useEffect } from "react";
import REACT_TYPES from "../DependencyInjection/ReactTypes";
import IEntityManager from "../../Core/BusinessLogic/EntityManager/IEntityManager";

export function useH5PFlag(): [boolean, (input: boolean) => void, () => void] {
  const [data, setData] = useState(false);
  let entityManager: IEntityManager = useInjection(REACT_TYPES.IEntityManager);
  useEffect(() => {
    entityManager.subscribeH5PFlag(setData);
    setData(entityManager.ShowH5PFlar);
  }, []);

  return [
    data,
    (input: boolean) => {
      entityManager.setShowH5P(input);
    },
    () => {
      entityManager.unsubscribeH5PFlag(setData);
    },
  ];
}

export function useH5PData(): [number, (input: number) => void, () => void] {
  const [data, setData] = useState(0);
  let entityManager: IEntityManager = useInjection(REACT_TYPES.IEntityManager);
  useEffect(() => {
    entityManager.subscribeH5PData(setData);
    setData(entityManager.H5PData);
  }, []);

  return [
    data,
    (input: number) => {
      entityManager.setH5PData(input);
    },
    () => {
      entityManager.unsubscribeH5PData(setData);
    },
  ];
}
