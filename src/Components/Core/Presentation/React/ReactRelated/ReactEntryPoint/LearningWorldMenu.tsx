import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import LearningWorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";

export default function LearningWorldMenu() {
  return (
    <React.Fragment>
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <section className="grid order-2 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <LearningWorldSelection className="col-start-1 p-2 border-r-2 border-dotted lg:p-8 border-adlerdarkblue" />
          <LearningWorldDetail className="col-start-2 p-2 lg:p-8" />
        </section>
        <MenuHeaderBar
          location="world"
          className="self-center order-1 w-full p-2 font-semibold border-b-2 border-dotted border-adlerdarkblue"
        />
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <div className="text-lg font-bold text-adlerdarkblue">
            <p>
              Die AdLer Engine ist für den<br></br>
              Landscape Modus konzipiert.<br></br>
              Bitte nimm dein Smartphone quer.<br></br>
              Danke!
            </p>
          </div>
        </StyledModal>
      </main>
    </React.Fragment>
  );
}
