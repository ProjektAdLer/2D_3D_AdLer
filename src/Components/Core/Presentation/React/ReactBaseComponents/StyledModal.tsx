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
    <StyledContainer
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center max-h-full modal bg-blacktrans50"
      {...restProps}
    >
      {/*Header with optional close button*/}
      <div className="flex flex-col justify-center gap-2 p-2 m-3 rounded-lg button-container w-fit h-fit">
        <div className="w-full "> {title}</div>
        {canClose && (
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-black text-white border-b-4 border-r-4 rounded-lg button-close lg:text-xl drop-shadow-sm border-adlerdarkblue active:border-0 hover:cursor-pointer bg-adlerblue"
          >
            X
          </button>
        )}
      </div>
      {/*Content*/}
      <div className="overflow-auto border-t-2 border-b-2 rounded-lg modal-content border-adlerlightblue">
        {children}
      </div>
      {/*Optional Footer*/}
      {hasFooter && (
        <div className="modal-footer ">
          <p>{footer}</p>
        </div>
      )}
    </StyledContainer>
  );
}
