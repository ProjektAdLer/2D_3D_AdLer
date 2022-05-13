export default function TextComponent(props: { textContent: string }) {
  return (
    <div className="lg:w-1/2">
      <p>{props.textContent}</p>
    </div>
  );
}
