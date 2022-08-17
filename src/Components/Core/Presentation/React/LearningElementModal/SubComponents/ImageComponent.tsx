export default function ImageComponent(props: { imagesrc: string }) {
  return (
    <div className="flex justify-center overflow-auto items-top max-h-90pro">
      <img alt="LearningImage!" src={props.imagesrc}></img>
    </div>
  );
}
