import React from "react";
import StyledContainer from "./StyledContainer";
import closeIcon from "../../../../../../Assets/icons/close.svg";
import CloseButton from "./CloseButton";
import tailwindMerge from "../../../Utils/TailwindMerge";

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
        className="fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center bg-blacktrans"
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
          className="z-50 flex max-h-[95%] max-w-[95%] flex-col overflow-hidden rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-2"
        >
          <div className="lg:roboto-black flex h-fit w-full items-center justify-center gap-2 p-1 pb-3 text-xl font-bold text-adlerdarkblue lg:text-2xl mobile-landscape:text-sm mobile-portrait:text-sm">
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
                  className="sm:w-6 md:w-8 lg:w-10"
                  alt="CloseButton"
                ></img>
              </CloseButton>
            )}
          </div>
          {/*Content*/}
          <div className="font-regular scrollGutter h-fit overflow-auto rounded-lg px-1 mobile-landscape:text-xs mobile-portrait:text-xs">
            {children}
          </div>
          {/*Optional Footer*/}
          {hasFooter && <>{footer}</>}
        </div>
      </div>
    </StyledContainer>
  );
}
