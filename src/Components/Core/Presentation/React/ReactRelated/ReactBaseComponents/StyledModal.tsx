import React from "react";
import StyledContainer from "./StyledContainer";
import StyledButton from "./StyledButton";

type Props = Partial<{
  hasFooter?: boolean;
  showModal: boolean;
  smallCloseButton: boolean;
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
 * @param smallCloseButton can be used to depict smaller X button
 * @param children the content of the modal
 * @param title the title of the modal
 * @param onClose the callback, that is called, when the modal is closed
 * @param footer the footer of the modal (For now Only Strings are supported)
 * @param canClose decides, if the modal can be closed by the User
 */
export default function StyledModal({
  hasFooter = false,
  showModal,
  smallCloseButton = false,
  children,
  title,
  canClose = true,
  onClose,
  footer,
  ...restProps
}: Readonly<Props>) {
  if (!showModal) return null;
  return (
    <StyledContainer
      {...restProps}
      className="z-50 flex items-center justify-center"
    >
      <div
        className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full bg-blacktrans"
        onClick={onClose}
        // onKeyDown={onClose}
        // tabIndex={0}
      >
        {/*Header with optional close button*/}
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="z-50 p-2 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%] overflow-hidden"
        >
          <div className="flex items-center justify-center w-full gap-2 p-1 pb-3 text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl h-fit">
            <div className="w-full">{title}</div>
            {canClose && (
              <StyledButton
                shape={smallCloseButton ? "smallCloseButton" : "closeButton"}
                onClick={(event) => {
                  onClose?.();
                }}
              >
                X
              </StyledButton>
            )}
          </div>
          {/*Content*/}
          <div className="px-1 overflow-auto rounded-lg font-regular h-fit">
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
