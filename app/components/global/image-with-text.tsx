import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string;
  heading: string;
  subheading: string | React.ReactNode;
  buttonUrl: string;
  imagePosition: "left" | "right";
};

const ImageWithText = ({
  imageUrl,
  heading,
  subheading,
  buttonUrl,
  imagePosition = "left",
}: Props) => {
  return (
    <section className="w-screen">
      <div
        className={`${
          imagePosition === "right" ? "flex-row-reverse" : "flex-row"
        } flex items-center justify-center`}
      >
        <div className="flex-1">
          <Image
            className="w-full h-full"
            src={imageUrl}
            height={1000}
            width={1000}
            alt="Image"
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-lg">
            <h3 className="text-[42px] leading-[46px]">{heading}</h3>
            <p className="text-sm leading-4.5 mt-4">{subheading}</p>
            <Link
              className="mt-6 block w-fit uppercase underline"
              href={buttonUrl}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageWithText;
