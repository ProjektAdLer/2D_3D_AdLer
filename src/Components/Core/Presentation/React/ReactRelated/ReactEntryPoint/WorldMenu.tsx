import { useInjection } from "inversify-react";
import React, { useEffect } from "react";
import ILoadWorldUseCase from "src/Components/Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import HeaderBar from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBar";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";

export default function WorldMenu() {
  const loadWorldUseCase = useInjection<ILoadWorldUseCase>(
    USECASE_TYPES.ILoadWorldUseCase
  );

  useEffect(() => {
    loadWorldUseCase.executeAsync();
  }, []);

  return (
    <React.Fragment>
      <div className="grid h-[90vh] max-h-screen grid-cols-10 grid-rows-24 m-6 border-8 rounded-lg root bg-adlerblue-100 border-adlerdarkblue">
        <div className="col-span-10 col-start-1 row-span-3 row-start-1 p-2 text-4xl border-b-8 border-adlerdarkblue">
          <HeaderBar />
        </div>
        <div className="flex justify-center col-span-5 col-start-1 row-start-4 p-8 border-r-8 row-span-full border-adlerdarkblue bg-adlergold">
          <SpaceSelection />
        </div>
        <div className="flex justify-center col-span-5 col-start-6 row-start-4 p-8 row-span-full bg-adlergold">
          <DetailSection />
        </div>
      </div>
    </React.Fragment>
  );
}
