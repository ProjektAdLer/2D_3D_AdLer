import ObservablePrimitive from "../Observables/ObservablePrimitive";

export type Entity<T> = {
  [Property in keyof T]: T[Property] extends ObservablePrimitive<infer U>
    ? U
    : T;
};
