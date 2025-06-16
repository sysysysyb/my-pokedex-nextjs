import Image from "next/image";
import RotateGif from "@/images/rotate.gif";

export default function loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src={RotateGif} alt="loading" className="size-20" />
    </div>
  );
}
