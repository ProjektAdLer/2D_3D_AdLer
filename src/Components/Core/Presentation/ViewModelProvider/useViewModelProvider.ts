import { ConstructorReference } from "./../../Types/EntityManagerTypes";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelProvider from "./IViewModelProvider";

export default function useViewModelProvider<T>(
  viewModelType: ConstructorReference<T>
): T[] {
  const viewModelProvider = useInjection<IViewModelProvider>(
    CORE_TYPES.IViewModelProvider
  );
  const [viewModels, setViewModels] = useState<T[]>([]);

  function setState(newState: T[]): void {
    setViewModels([...newState]);
  }

  useEffect(() => {
    viewModelProvider.registerRequest<T>(setState, viewModelType);
    return () => {
      viewModelProvider.cancelRequest<T>(setState, viewModelType);
    };
  }, []);

  return viewModels;
}
