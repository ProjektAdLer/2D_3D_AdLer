import useObservable from "../../../React/ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../../React/ReactRelated/CustomHooks/useBuilder";
import ExitModalViewModel from "./ExitModalViewModel";
import StyledModal from "../../../React/ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../../React/ReactRelated/ReactBaseComponents/StyledButton";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IExitModalController from "./IExitModalController";

export default function ExitModal() {
  const [viewModel, controller] = useBuilder<
    ExitModalViewModel,
    IExitModalController
  >(BUILDER_TYPES.IExitModalBuilder);
  const [isOpen, setOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;

  return (
    <StyledModal
      title={viewModel.modalTitle.Value}
      onClose={() => {
        setOpen(false);
      }}
      showModal={isOpen}
      className={`flex flex-col justify-center gap-2 p-2 m-3 rounded-lg h-[80vh] `}
    >
      <StyledButton>Test</StyledButton>
    </StyledModal>
  );
}
