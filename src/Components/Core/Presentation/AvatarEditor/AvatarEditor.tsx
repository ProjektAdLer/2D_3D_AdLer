import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import AvatarEditorCategoryTabButton from "./AvatarEditorCategories/AvatarEditorCategoryTabButton";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories/AvatarEditorCategories";
import AvatarEditorHairCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorHairCategory";
import AvatarEditorAccessoireCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorAccessoireCategory";
import AvatarEditorClothingCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorClothingCategory";
import AvatarEditorPreview from "./AvatarEditorPreview/AvatarEditorPreview";
import AvatarEditorBodyCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorBodyCategory";
import LoadingScreen from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreen";
import LoadingScreenHomePageInformation from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenHomePageInformation";
import { useInjection } from "inversify-react";
import ILoadAvatarConfigUseCase from "../../Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AvatarEditorFaceCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorFaceCategory";
import AvatarEditorSaveButton from "./AvatarEditorSaveButton";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import AvatarEditorRandomizerButton from "./AvatarEditorRandomizerButton";

export default function AvatarEditor() {
  const [viewModel, controller] = useBuilder<
    AvatarEditorViewModel,
    IAvatarEditorController
  >(BUILDER_TYPES.IAvatarEditorBuilder);

  const [activeTab, setActiveTab] = useState<AvatarEditorCategory>(
    OAvatarEditorCategory.HAIR,
  );
  const loadAvatarConfigUseCase = useInjection<ILoadAvatarConfigUseCase>(
    USECASE_TYPES.ILoadAvatarConfigUseCase,
  );

  useEffect(() => {
    if (!controller) return;
    loadAvatarConfigUseCase.executeAsync();
  }, [controller, loadAvatarConfigUseCase]);

  if (!viewModel || !controller) return null;

  return (
    <div className="flex flex-col portrait:flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden text-adlerdarkblue">
      <MenuHeaderBar
        location="editor"
        className="self-center w-full p-2 font-semibold"
        externContent={{
          contentLocation: "editor",
          content: (
            <AvatarEditorSaveButton
              controller={controller}
              viewModel={viewModel}
            />
          ),
        }}
      />
      <div className="grid grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-3 grow lg:rounded-lg">
        {/* Categories (Left Side) */}
        <div className="flex flex-col portrait:order-2 portrait:row-span-2">
          {/* Category Tabs */}
          {/* Category Header */}
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-darkblue portrait:text-xl">
                {activeTab === OAvatarEditorCategory.HAIR && "Haare"}
                {activeTab === OAvatarEditorCategory.FACE && "Gesicht"}
                {activeTab === OAvatarEditorCategory.ACCESSOIRE &&
                  "Accessoires"}
                {activeTab === OAvatarEditorCategory.CLOTHING && "Kleidung"}
                {activeTab === OAvatarEditorCategory.BODY && "Körper"}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center p-2 space-x-4">
            {Object.values(OAvatarEditorCategory)
              .filter((category) => typeof category === "number")
              .map((category) => (
                <AvatarEditorCategoryTabButton
                  key={category}
                  category={category as AvatarEditorCategory}
                  active={activeTab === category}
                  onClick={() => setActiveTab(category)}
                />
              ))}
            <AvatarEditorRandomizerButton
              controller={controller}
              viewModel={viewModel}
            />
          </div>

          {/* Category Contents */}
          <div className="p-4 max-h-[77vh] portrait:max-h-[35svh] overflow-auto">
            {activeTab === OAvatarEditorCategory.HAIR && (
              <AvatarEditorHairCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.FACE && (
              <AvatarEditorFaceCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.ACCESSOIRE && (
              <AvatarEditorAccessoireCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.CLOTHING && (
              <AvatarEditorClothingCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.BODY && (
              <AvatarEditorBodyCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
          </div>
        </div>

        {/* Avatar Preview (Right Side) */}
        <div className="p-4 flex justify-start items-start portrait:w-full portrait:max-h-[40svh] portrait:order-1">
          <AvatarEditorPreview className="relative z-10 w-full h-full" />
        </div>
      </div>
      <LoadingScreen
        content={<LoadingScreenHomePageInformation />}
        i18nKeys={{
          namespace: "avatarEditor",
          button: "enterAvatarEditor",
          onLoading: "loadAvatarEditor",
          onLoadingFinished: "finishedAvatarEditor",
        }}
        autoClose={true}
      />
    </div>
  );
}
