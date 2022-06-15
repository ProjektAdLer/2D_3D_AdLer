import React from "react";

type Props = Partial<{
  showModal: boolean;
  children: React.ReactNode;
  title: string;
  canClose: boolean;
  onClose: () => void;
  footer: string;
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
    <div
      className="modal flex justify-center items-center fixed max-h-full top-0 left-0 right-0 bottom-0 bg-blacktrans50"
      {...restProps}
    >
      <div className="modal-body flex flex-col bg-adlerlightblue w-fit h-fit border-8 max-h-90pro border-adlerlightblue rounded-lg">
        <div className="modal-header font-black flex justify-end items-center p-4 h-4 lg:h-16 text-xl lg:text-4xl">
          <div className="w-full "> {title}</div>
          {canClose && (
            <button
              onClick={onClose}
              className="button-close font-black text-xs lg:text-xl drop-shadow-sm border-b-4 border-r-4 border-adlerdarkblue active:border-0 hover:cursor-pointer py-1 px-2 bg-adlerblue rounded-lg text-white"
            >
              X
            </button>
          )}
        </div>
        <div className="modal-content p-4 border-t-2 border-b-2 rounded-lg border-adlerlightblue overflow-auto">
          {children}
        </div>
        <div className="modal-footer font-medium flex shrink justify-between items-center p-4 h-fit">
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
}
