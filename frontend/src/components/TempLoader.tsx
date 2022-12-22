import ContentLoader from "react-content-loader";

export default function TempLoader(props: any) {
  return (
    <ContentLoader
      speed={2}
      className="h-5 w-15 self-center opacity-60"
      viewBox="0 0 200 38"
      backgroundColor="#ddd"
      foregroundColor="#bbb"
      {...props}
    >
      <rect x="0" y="0" rx="15" ry="15" width="200" height="38" />
    </ContentLoader>
  );
}
