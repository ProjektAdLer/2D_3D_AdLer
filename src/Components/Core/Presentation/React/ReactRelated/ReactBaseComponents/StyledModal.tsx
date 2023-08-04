import React from "react";
import StyledContainer from "./StyledContainer";
import StyledButton from "./StyledButton";

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
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center h-full bg-blacktrans">
        {/*Header with optional close button*/}
        <div className="p-2 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%]">
          <div className="flex items-center justify-center w-full gap-2 p-1 pb-3 text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl h-fit">
            <div className="w-full">{title}</div>
            {canClose && (
              <StyledButton
                onClick={onClose}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
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
