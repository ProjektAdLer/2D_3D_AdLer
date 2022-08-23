export default function TextComponent(props: { textContent: string }) {
  return (
    <div className="w-[400px] lg:w-[800px] h-[80vh] overflow-auto bg-adlerlightblue p-3">
      <p>{props.textContent}</p>
    </div>
  );
}
