import React from "react";
import StyledContainer from "./StyledContainer";

type Props = Partial<{
  hasFooter?: boolean;
  showModal: boolean;
  children: React.ReactNode;
  title: string;
  canClose: boolean;
  onClose: () => void;
  footer: string;
  [x: string]: any;
}>;

/**
 * A generic, styled modal component. Can be used to display any content.
 *
 * @param showModal decides, if the modal should be shown
 * @param children the content of the modal
 * @param title the title of the modal
 * @param onClose the callback, that is called, when the modal is closed
 * @param footer the footer of the modal (For now Only Strings are supported)
 * @param canClose decides, if the modal can be closed by the User
 */
export default function StyledModal({
  hasFooter = false,
  showModal,
  children,
  title,
  canClose = true,
  onClose,
  footer,
  ...restProps
}: Props) {
  if (!showModal) return null;
  return (
    <StyledContainer {...restProps}>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center h-full bg-blacktrans50">
        {/*Header with optional close button*/}
        <div className="p-2 rounded-lg bg-adlergold">
          <div className="flex items-center justify-center w-full gap-2 p-1 pb-3 text-2xl font-black text-white text-shadow lg:text-3xl h-fit bg-adlergold">
            <div className="w-full">{title}</div>
            {canClose && (
              <button
                onClick={onClose}
                className="px-2 py-1 text-xs font-black text-white border-b-4 border-r-4 rounded-lg button-close lg:text-xl border-adlerdarkblue active:border-0 hover:cursor-pointer bg-adlerblue"
              >
                X
              </button>
            )}
          </div>
          {/*Content*/}
          <div className="overflow-auto rounded-lg bg-adlergold h-[80vh]">
            {children}
          </div>
          {/*Optional Footer*/}
          {hasFooter && (
            <div className="modal-footer ">
              <p>{footer}</p>
            </div>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}
