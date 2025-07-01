import React from "react";
import StyledContainer from "./StyledContainer";
import closeIcon from "../../../../../../Assets/icons/close.svg";
import CloseButton from "./CloseButton";

type Props = Partial<{
  hasFooter?: boolean;
  showModal: boolean;
  smallCloseButton: boolean;
  lefthalfshift?: boolean;
  children: React.ReactNode;
  title: string;
  canClose: boolean;
  onClose: () => void;
  footer: JSX.Element;
  closeButtonToolTip?: string;
  [x: string]: any;
}>;

/**
 * A generic, styled modal component. Can be used to display any content.
 *
 * @param hasFooter decides, if the modal should have a footer
 * @param showModal decides, if the modal should be shown
 * @param smallCloseButton can be used to depict smaller X button
 * @param lefthalfshift can be used to center the modal on the left half of the screen
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
  lefthalfshift = false,
  children,
  title,
  canClose = true,
  onClose,
  footer,
  closeButtonToolTip,
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
        style={lefthalfshift ? { width: "50%" } : {}}
        onClick={onClose}
        // onKeyDown={onClose}
        // tabIndex={0}
      >
        {/*Header with optional close button*/}
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="z-50 p-2 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%] overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-center w-full gap-2 p-1 pb-3 text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl h-fit mobile-landscape:text-sm mobile-portrait:text-sm">
            <div className="w-full">{title}</div>
            {canClose && (
              <CloseButton
                onClick={(event) => {
                  onClose?.();
                }}
                title={closeButtonToolTip}
              >
                <img
                  src={closeIcon}
                  className="lg:w-10 md:w-8 sm:w-6"
                  alt="CloseButton"
                ></img>
              </CloseButton>
            )}
          </div>
          {/*Content*/}
          <div className="px-1 overflow-auto rounded-lg font-regular h-fit scrollGutter mobile-portrait:text-xs mobile-landscape:text-xs">
            {children}
          </div>
          {/*Optional Footer*/}
          {hasFooter && <>{footer}</>}
        </div>
      </div>
    </StyledContainer>
  );
}
