import AbstractEntity from "../Entities/API/AbstractEntity";
import ObservablePrimitive from "../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import ObservableReadonlyID from "../BusinessLogic/EntityManager/Observables/ObservableReadonlyID";

export type Entity<T extends AbstractEntity> = {
  [Property in keyof T]: T[Property] extends ObservablePrimitive<infer U>
    ? U
    : T;
};

type EntityWithIds<T extends AbstractEntity> = {
  [Property in keyof T]: T[Property] extends ObservableReadonlyID
    ? string
    : never;
};

export type EntityReference<T extends AbstractEntity> = keyof EntityWithIds<T>;
