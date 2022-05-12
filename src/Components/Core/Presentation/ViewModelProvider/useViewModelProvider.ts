import { ConstructorReference } from "./../../Types/EntityManagerTypes";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelProvider from "./IViewModelProvider";

export default function useViewModelProvider<VM, C>(
  viewModelType: ConstructorReference<VM>
): [VM[], C[]] {
  const viewModelProvider = useInjection<IViewModelProvider>(
    CORE_TYPES.IViewModelProvider
  );
  const [viewModels, setViewModels] = useState<VM[]>([]);
  const [controllers, setControllers] = useState<C[]>([]);

  function setState(newState: VM[]): void {
    setViewModels([...newState]);
  }

  useEffect(() => {
    viewModelProvider.registerRequest<VM>(setState, viewModelType);
    return () => {
      viewModelProvider.cancelRequest<VM>(setState, viewModelType);
    };
  }, []);

  return [viewModels, controllers];
}
