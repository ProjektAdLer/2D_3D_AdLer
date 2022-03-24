import { useEffect, useState } from "react";
import { Primitive } from "./../../Core/BusinessLogic/EntityManager/Observables/Observable";
import ObservablePrimitive from "../../Core/BusinessLogic/EntityManager/Observables/ObservablePrimitive";

export default function usePrimitive<U extends Primitive>(
  primitive: ObservablePrimitive<U>
): [U, (input: U) => void] {
  const [data, setData] = useState<U>();

  useEffect(() => {
    primitive.subscribe(setData);
    return () => primitive.unsubscribe(setData);
  }, []);

  return [
    data as U,
    (input: U) => {
      primitive.setValue(input);
    },
  ];
}
