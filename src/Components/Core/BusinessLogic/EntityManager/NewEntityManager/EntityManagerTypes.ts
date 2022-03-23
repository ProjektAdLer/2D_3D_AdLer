import AbstractEntity from "../../../Entities/API/AbstractEntity";
import ObservablePrimitive from "../Observables/ObservablePrimitive";
import ObservableReadonlyID from "../Observables/ObservableReadonlyID";

export type Entity<T extends AbstractEntity> = {
  [Property in keyof T]: T[Property] extends ObservablePrimitive<infer U>
    ? U
    : T;
};

type EntityWithIds<T extends AbstractEntity> = {
  [Property in keyof T]: T[Property] extends ObservableReadonlyID
    ? string
    : never;
}[keyof T];

export type EntityReference<T extends AbstractEntity> = Pick<
  T,
  EntityWithIds<T>
>;

// We take the keys of P and if T[P] is a Function we type P as P (the string literal type for the key), otherwise we type it as never.
// Then we index by keyof T, never will be removed from the union of types, leaving just the property keys that were not typed as never
type JustMethodKeys<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];
type JustMethods<T> = Pick<T, JustMethodKeys<T>>;
