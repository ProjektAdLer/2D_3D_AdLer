import { ConstructorReference } from "./../../Types/EntityManagerTypes";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IViewModelControllerProvider from "./IViewModelControllerProvider";

export default function useViewModelProvider<VM, C = unknown>(
  viewModelType: ConstructorReference<VM>
): [VM[], C[]] {
  const viewModelProvider = useInjection<IViewModelControllerProvider>(
    CORE_TYPES.IViewModelProvider
  );
  const [viewModels, setViewModels] = useState<VM[]>([]);
  const [controllers, setControllers] = useState<C[]>([]);

  function setState(newViewModel: VM[], newController: C[]): void {
    if (newViewModel !== viewModels) setViewModels([...newViewModel]);
    if (newController !== controllers) setControllers([...newController]);
  }

  useEffect(() => {
    viewModelProvider.registerTupelRequest<VM, C>(setState, viewModelType);
    return () => {
      viewModelProvider.cancelRequest<VM, C>(setState, viewModelType);
    };
  }, []);

  return [viewModels, controllers];
}
