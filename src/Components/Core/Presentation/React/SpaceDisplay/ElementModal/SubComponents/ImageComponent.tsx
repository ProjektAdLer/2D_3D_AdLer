import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ElementModalViewModel from "../ElementModalViewModel";

export default function ImageComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [imageUrl] = useObservable(viewModel.filePath);

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
