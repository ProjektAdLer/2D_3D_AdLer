export default function CheckBoxEntry({
  checked,
  text,
}: {
  checked: boolean;
  text: string;
}) {
  return (
    <div className="flex flex-row">
      <input type="checkbox" checked={checked} />
      <div>{text}</div>
    </div>
  );
}
