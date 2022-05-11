import { useEffect, useState } from "react";
import Observable from "../../../../../Lib/Observable";

export default function useObservable<U>(
  observable: Observable<U>
): [U, (input: U) => void] {
  const [data, setData] = useState<U>();

  useEffect(() => {
    if (observable) {
      setData(observable.Value);

      observable.subscribe(setData);
    }

    return () => {
      if (observable) {
        observable.unsubscribe(setData);
      }
    };
  }, [observable]);

  return [
    data as U,
    (input: U) => {
      observable.Value = input;
    },
  ];
}
