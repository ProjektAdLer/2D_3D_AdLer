type Props = Partial<{
  text: string;
}>;

export default function TextWithLineBreaks({ text, ...restProps }: Props) {
  return (
    <div {...restProps}>
      {text!.split("\n").map((str) => (
        <p key={str}>{str}</p>
      ))}
    </div>
  );
}
