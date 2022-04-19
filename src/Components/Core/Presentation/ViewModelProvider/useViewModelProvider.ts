import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelProvider from "./IViewModelProvider";

export default function useViewModelProvider<T>(viewModelType: {
  new (): T;
}): T[] {
  const viewModelProvider = useInjection<IViewModelProvider>(
    CORE_TYPES.IViewModelProvider
  );
  const [viewModels, setViewModels] = useState<T[]>(new Array<T>());

  useEffect(() => {
    viewModelProvider.registerRequest<T>(setViewModels, viewModelType);
    return () => {
      viewModelProvider.cancelRequest<T>(setViewModels, viewModelType);
    };
  }, []);

  return viewModels;
}
