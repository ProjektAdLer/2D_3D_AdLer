type Props = Partial<{
  text: string;
}>;

export default function TextWithLineBreaks({ text, ...restProps }: Props) {
  return (
    <div {...restProps}>
      {text!.split("\n").map((str) => (
        <p>{str}</p>
      ))}
    </div>
  );
}
