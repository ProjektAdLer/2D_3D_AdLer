import { useEffect, useState } from "react";
import ObservablePrimitive, {
  Primitive,
} from "../../Domain/EntityManager/Observables/ObservablePrimitive";

export default function useNewPrimitive<U extends Primitive>(
  primitive: ObservablePrimitive<U>
): [U, (input: U) => void] {
  const [data, setData] = useState<U>();

  useEffect(() => {
    if (primitive) {
      setData(primitive.Value);

      primitive.subscribe(setData);
    }

    //return () => primitive.unsubscribe(setData);
  }, [primitive]);

  return [
    data as U,
    (input: U) => {
      primitive.setValue(input);
    },
  ];
}
