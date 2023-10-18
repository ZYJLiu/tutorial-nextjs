// Used in mdx file to prevent images from getting too large
const StyledImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  props,
) => <img style={{ maxWidth: "50vw", width: "100%" }} {...props} />;

export default StyledImage;
