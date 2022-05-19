export default function TextComponent(props: { textContent: string }) {
  return (
    <div className="w-[400px] lg:w-[800px]">
      <p>{props.textContent}</p>
    </div>
  );
}
