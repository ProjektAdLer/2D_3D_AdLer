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
    <div className="max-h-[90vh] pb-4 portrait:max-w-[90vw]">
      <div className="slider-wrapper mx-0 my-auto flex flex-col items-center gap-6">
        <div className="slider flex max-h-[90vh] flex-col items-center justify-center gap-4 overflow-y-auto portrait:max-w-[90vw]">
          {/* Description Title Text */}
          <p className="w-full max-w-[60vw] pb-4 pl-6 text-sm font-bold text-adlerdarkblue md:text-xl lg:text-xl ultraWide:max-w-[40vw] mobile-landscape:pb-0 mobile-landscape:text-2xs mobile-portrait:max-w-[90dvw]">
            {breakTimeNotification.titleMessageKeys.map((key) => {
              return translate(key) + " ";
            })}
          </p>

          {/* Image Slider */}
          <div className="align-center flex w-full flex-row justify-center">
            {/* Button left*/}
            <div className="flex w-12 items-center justify-start">
              {currentSlide > 0 && (
                <StyledButton
                  shape="smallSquare"
                  className="w-full rounded-xl bg-whitetrans"
                  onClick={() => {
                    setCurrentSlide(currentSlide - 1);
                  }}
                  title={translate("previousSlideToolTip").toString()}
                  data-testid="breaktime-previousSlide"
                >
                  <p className="rotate-180">&#10140;</p>
                </StyledButton>
              )}
            </div>
            {/* Image Slide */}
            <img
              id="slide-2"
              className="max-h-[60vh] rounded-lg object-cover portrait:max-w-[70vw]"
              src={breakTimeNotification.images[currentSlide]}
              title="Pausenhinweis"
              alt=""
            />
            {/* Button right*/}
            <div className="flex w-12 items-center justify-end">
              {currentSlide < breakTimeNotification.images.length - 1 && (
                <StyledButton
                  shape="smallSquare"
                  className="w-full rounded-xl bg-whitetrans"
                  onClick={() => {
                    setCurrentSlide(currentSlide + 1);
                  }}
                  title={translate("nextSlideToolTip").toString()}
                  data-testid="breaktime-nextSlide"
                >
                  <p className="">&#10140;</p>
                </StyledButton>
              )}
            </div>
          </div>
        </div>

        {/* Image Slide Navigation Dots */}
        {breakTimeNotification.images.length > 1 && (
          <div className="slider-nav z-10 flex gap-4 lg:gap-6">
            {breakTimeNotification.images.map((_, index) => {
              return (
                <button
                  className={
                    (currentSlide === index ? "bg-yellow-400 " : "bg-white ") +
                    "h-2 w-2 rounded-full opacity-75 transition duration-200 ease-in-out hover:opacity-100 lg:h-4 lg:w-4"
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
