import Image from "next/image";

export default function StyledImage({
  src,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src={src!}
      alt=""
      width={1000}
      height={500}
      className="w-full max-w-[60vw] rounded-2xl"
    />
  );
}
