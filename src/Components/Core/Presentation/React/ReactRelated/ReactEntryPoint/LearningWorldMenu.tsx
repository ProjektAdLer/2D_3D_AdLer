import { useInjection } from "inversify-react";
import React, { useEffect } from "react";
import ILoadWorldUseCase from "src/Components/Core/Application/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import HeaderBar from "~ReactComponents/LearningRoomMenu/HeaderBar/HeaderBar";
import LearningRoomDetail from "~ReactComponents/LearningRoomMenu/LearningRoomDetail/LearningRoomDetail";
import LearningRoomSelection from "~ReactComponents/LearningRoomMenu/LearningRoomSelection/LearningRoomSelection";

export default function LearningWorldMenu() {
  const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
    USECASE_TYPES.ILoadWorldUseCase
  );

  useEffect(() => {
    loadWorldUseCase.executeAsync();
  }, []);

  return (
    <React.Fragment>
      <div className="grid h-[90vh] max-h-screen grid-cols-10 grid-rows-24 m-6 border-8 rounded-lg root bg-adlerlightblue border-adlerdarkblue">
        <div className="col-span-10 col-start-1 row-span-3 row-start-1 p-2 text-4xl border-b-8 border-adlerdarkblue">
          <HeaderBar />
        </div>
        <div className="flex justify-center col-span-5 col-start-1 row-start-4 p-8 border-r-8 row-span-full border-adlerdarkblue bg-green-50">
          <LearningRoomSelection />
        </div>
        <div className="flex justify-center col-span-5 col-start-6 row-start-4 p-8 border-r-8 row-span-full border-adlerdarkblue bg-green-50">
          <LearningRoomDetail />
        </div>
      </div>
    </React.Fragment>
  );
}
