export default function ImageComponent(props: { imagesrc: string }) {
  return (
    <img
      alt="Learningimage!"
      src={props.imagesrc}
      style={{ width: "95%" }}
    ></img>
  );
}
