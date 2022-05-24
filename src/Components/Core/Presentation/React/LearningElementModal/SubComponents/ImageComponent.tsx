export default function ImageComponent(props: { imagesrc: string }) {
  return (
    <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px]">
      <img
        className="sm:max-w-[300px] md:max-w-[315px] lg:max-w-[700px] xl:max-w-[900px] 2xl:max-w-[1100px]"
        alt="LearningImage!"
        src={props.imagesrc}
      ></img>
    </div>
  );
}
