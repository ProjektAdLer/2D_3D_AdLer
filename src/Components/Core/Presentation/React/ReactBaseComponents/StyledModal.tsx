import React from "react";

type Props = Partial<{
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
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center max-h-full modal bg-blacktrans50"
      {...restProps}
    >
      <div className="flex flex-col border-8 rounded-lg modal-body bg-adlerlightblue w-fit h-fit max-h-90pro border-adlerlightblue">
        <div className="flex items-center justify-end h-4 p-4 text-xl font-black modal-header lg:h-16 lg:text-4xl">
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
        <div className="p-4 overflow-auto border-t-2 border-b-2 rounded-lg modal-content border-adlerlightblue">
          {children}
        </div>
        <div className="flex items-center justify-between p-4 font-medium modal-footer shrink h-fit">
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
}
