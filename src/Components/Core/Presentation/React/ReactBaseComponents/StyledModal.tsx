import React from "react";

type Props = Partial<{
  showModal: boolean;
  children: React.ReactNode;
  title: string;
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
 */
export default function StyledModal({
  showModal,
  children,
  title,
  onClose,
  footer,
  ...restProps
}: Props) {
  if (!showModal) return null;

  return (
    <div
      className="modal flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-blacktrans50"
      {...restProps}
    >
      <div className="modal-content bg-adlerlightblue w-full lg:w-5/6 max-h-screen border-8 border-adlerlightblue rounded-lg overflow-auto">
        <div className="modal-header font-black flex justify-between items-center p-4 h-4 lg:h-16 text-xl lg:text-4xl">
          {title}
          <button
            onClick={onClose}
            className="button-close font-black text-xs lg:text-xl drop-shadow-sm border-b-4 border-r-4 border-adlerdarkblue active:border-0 hover:cursor-pointer py-1 px-2 bg-adlerblue rounded-lg text-white"
          >
            X
          </button>
        </div>
        <div className="modal-body flex justify-center p-2 border-t-2 border-b-2 rounded-lg border-adlerlightblue">
          {children}
        </div>
        <div className="modal-footer font-medium flex shrink justify-between items-center p-4 h-16">
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
}
