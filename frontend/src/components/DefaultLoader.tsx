import ContentLoader from "react-content-loader";

export default function DefaultLoader(props: any) {
  return (
    <ContentLoader
      speed={2}
      className="w-full h-20"
      viewBox="0 0 400 70"
      backgroundColor="#004366"
      foregroundColor="#01344f"
      {...props}
    >
      <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
      <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
    </ContentLoader>
  );
}
