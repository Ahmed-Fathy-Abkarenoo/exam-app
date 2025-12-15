import Image from "next/image";
import LogoIcon from "../../../../public/assets/icons/Vector.svg";

export default function Logo() {
  return (
    <div className="flex gap-3 p-1 items-center">
      <Image src={LogoIcon} alt="logo"></Image>
      <h5 className="font-semibold text-xl text-blue-600"> Exam App</h5>
    </div>
  );
}
