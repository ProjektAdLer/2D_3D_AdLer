export default function OpencastVideoHost({ url }: { url: string }) {
  if (!url) return null;
  return (
    <iframe
      className="w-full rounded-lg aspect-video"
      src={url}
      allowFullScreen
    ></iframe>
  );
}
