export default function ImageComponent(props: { imagesrc: string }) {
  return (
    <div className="flex justify-center overflow-auto items-top max-h-[90vh] max-w-[90vw]">
      <img
        className="object-contain"
        alt="LearningImage!"
        src={props.imagesrc}
      ></img>
    </div>
  );
}
