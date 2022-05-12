import { ConstructorReference } from "../../../Types/EntityManagerTypes";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IViewModelControllerProvider from "../../ViewModelProvider/IViewModelControllerProvider";

export default function useViewModelControllerProvider<VM, C = unknown>(
  viewModelType: ConstructorReference<VM>
): [VM[], C[]] {
  const viewModelProvider = useInjection<IViewModelControllerProvider>(
    CORE_TYPES.IViewModelProvider
  );
  const [viewModels, setViewModels] = useState<VM[]>([]);
  const [controllers, setControllers] = useState<C[]>([]);

  function callback(tupels: [VM, C][]): void {
    const newViewModels = tupels.map((tupel) => tupel[0]);
    const newControllers = tupels.map((tupel) => tupel[1]);

    setViewModels([...newViewModels]);
    setControllers([...newControllers]);
  }

  useEffect(() => {
    viewModelProvider.registerTupelRequest<VM, C>(callback, viewModelType);
    return () => {
      viewModelProvider.cancelRequest<VM, C>(callback, viewModelType);
    };
  }, []);

  return [viewModels, controllers];
}

function isIterable(obj: any) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}
