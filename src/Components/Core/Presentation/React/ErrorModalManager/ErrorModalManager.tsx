import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledModal from "../ReactBaseComponents/StyledModal";
import ErrorModalManagerController from "./ErrorModalManagerController";
import ErrorModalManagerViewModel from "./ErrorModalManagerViewModel";

export default function ErrorModalManager() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    ErrorModalManagerViewModel,
    ErrorModalManagerController
  >(ErrorModalManagerViewModel);

  const [errors, setErrors] = useObservable<string[]>(viewModels[0]?.errors);

  if (errors == null || errors.length === 0) return null;

  return (
    <StyledModal
      showModal={errors?.length > 0}
      onClose={() => {
        setErrors(
          errors.filter((error) => error !== errors[errors?.length - 1])
        );
      }}
    >
      Nachricht: {errors[errors?.length - 1]}
    </StyledModal>
  );
}
