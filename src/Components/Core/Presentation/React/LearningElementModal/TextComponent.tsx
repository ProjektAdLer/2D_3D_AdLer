export default function TextComponent(props: { textContent: string }) {
  return (
    <div>
      <p>{props.textContent}</p>
    </div>
  );
}
