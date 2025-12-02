export default function LocalVideoHost({ url }: { url: string }) {
  return <video src={url} controls={true} disablePictureInPicture={true} />;
}
