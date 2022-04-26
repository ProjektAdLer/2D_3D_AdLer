import { useEffect, useState } from "react";
import ObservablePrimitive, {
  Primitive,
} from "../../Domain/EntityManager/Observables/ObservablePrimitive";

export default function usePrimitive<U extends Primitive>(
  primitive: ObservablePrimitive<U>
): [U, (input: U) => void] {
  const [data, setData] = useState<U>(primitive.Value);

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
