import AbstractEntity from "../Domain/Entities/AbstractEntity";
import ObservablePrimitive from "../Domain/EntityManager/Observables/ObservablePrimitive";
import ObservableReadonlyID from "../Domain/EntityManager/Observables/ObservableReadonlyID";

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
