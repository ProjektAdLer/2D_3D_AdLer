import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import IGetElementSourceUseCase from "src/Components/Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ElementModalViewModel from "../ElementModalViewModel";

export default function ImageComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [imageUrl, setimageUrl] = useState("second");

  const getElementSourceUseCase = useInjection<IGetElementSourceUseCase>(
    USECASE_TYPES.IGetElementSource
  );

  useEffect(() => {
    const debug = async () => {
      const path = await getElementSourceUseCase.executeAsync({
        courseId: viewModel.parentCourseId.Value,
        elementId: viewModel.id.Value,
      });

      setimageUrl(path);
    };
    debug();
  }, []);

  return (
    <div className="flex justify-center overflow-auto items-top max-h-[90vh] max-w-[90vw]">
      <img className="object-contain" alt="LearningImage!" src={imageUrl}></img>
    </div>
  );
}

// imagesrc={
//   "https://www.xtrafondos.com/wallpapers/vertical/stormtrooper-de-star-wars-battlefront-5226.jpg"
//   // Alternative Images zum testen
//   // https://www.xtrafondos.com/wallpapers/vertical/stormtrooper-de-star-wars-battlefront-5226.jpg
//   // https://hdqwalls.com/wallpapers/star-wars-the-last-jedi-2017-5k-j8.jpg (Relativ Quadratisch)
//   // https://wallpaperaccess.com/full/652304.jpg (Breiter als hoch)
// }
