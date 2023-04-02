import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningElementModalViewModel from "../LearningElementModalViewModel";

export default function ImageComponent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [imageUrl] = useObservable(viewModel.filePath);

  return (
    <div className="flex justify-center max-h-[75vh] lg:max-h-[85vh] xl:max-h-[85vh] w-fit h-fit max-w-[99vw]">
      <img
        className="object-scale-down max-h-[93vh] w-fit max-w-[90vw] lg:max-w-[99vw]"
        alt="LearningImage!"
        src={imageUrl}
      ></img>
    </div>
  );
}

// imagesrc={
//   "https://www.xtrafondos.com/wallpapers/vertical/stormtrooper-de-star-wars-battlefront-5226.jpg"
//   // Alternative Images zum testen
//   // https://www.xtrafondos.com/wallpapers/vertical/stormtrooper-de-star-wars-battlefront-5226.jpg
//   // https://hdqwalls.com/wallpapers/star-wars-the-last-jedi-2017-5k-j8.jpg (Relativ Quadratisch)
//   // https://wallpaperaccess.com/full/652304.jpg (Breiter als hoch)
// https://www.dieblume-blumenbaur.de/images/blumen_2531_vis-crop-u4304.png?crc=458627822
// }
