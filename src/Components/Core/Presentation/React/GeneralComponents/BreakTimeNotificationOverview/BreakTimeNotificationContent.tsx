import { useState } from "react";
import { useTranslation } from "react-i18next";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function BreakTimeNotificationContent({
  breakTimeNotification,
}: {
  breakTimeNotification: IBreakTimeNotification;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { t: translate } = useTranslation("breakTime");

  return (
    <div className="pb-4 max-h-[90vh] portrait:max-w-[90vw]">
      <div className="flex flex-col items-center gap-6 mx-0 my-auto slider-wrapper">
        <div className="flex flex-col gap-4 overflow-y-auto items-center justify-center slider portrait:max-w-[90vw] max-h-[90vh]">
          {/* Description Title Text */}
          <p className="w-full pb-4 pl-6 text-sm font-bold md:text-xl lg:text-xl max-w-[60vw] ultraWide:max-w-[40vw] text-adlerdarkblue">
            {breakTimeNotification.titleMessageKeys.map((key) => {
              return translate(key) + " ";
            })}
          </p>

          {/* Image Slider */}
          <div className="flex flex-row justify-center w-full align-center">
            {/* Button left*/}
            <div className="flex items-center justify-start w-12">
              {currentSlide > 0 && (
                <StyledButton
                  shape="smallSquare"
                  className="w-full  bg-whitetrans rounded-xl"
                  onClick={() => {
                    setCurrentSlide(currentSlide - 1);
                  }}
                  title={translate("previousSlideToolTip").toString()}
                >
                  <p className="rotate-180">&#10140;</p>
                </StyledButton>
              )}
            </div>
            {/* Image Slide */}
            <img
              id="slide-2"
              className="object-cover max-h-[60vh] portrait:max-w-[70vw] rounded-lg"
              src={breakTimeNotification.images[currentSlide]}
              title="Pausenhinweis"
              alt=""
            />
            {/* Button right*/}
            <div className="flex items-center justify-end w-12">
              {currentSlide < breakTimeNotification.images.length - 1 && (
                <StyledButton
                  shape="smallSquare"
                  className="w-full bg-whitetrans rounded-xl "
                  onClick={() => {
                    setCurrentSlide(currentSlide + 1);
                  }}
                  title={translate("nextSlideToolTip").toString()}
                >
                  <p className="">&#10140;</p>
                </StyledButton>
              )}
            </div>
          </div>
        </div>

        {/* Image Slide Navigation Dots */}
        {breakTimeNotification.images.length > 1 && (
          <div className="z-10 flex gap-4 lg:gap-6 slider-nav">
            {breakTimeNotification.images.map((_, index) => {
              return (
                <button
                  className={
                    (currentSlide === index ? "bg-yellow-400 " : "bg-white ") +
                    "w-2 h-2 transition duration-200 ease-in-out rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
                  }
                  data-testid={"breakSliderButton" + index}
                  onClick={() => setCurrentSlide(index)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
