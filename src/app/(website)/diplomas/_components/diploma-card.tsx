"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { SubjectType } from "@/lib/types/diplomas";

export default function DiplomaCard({ subject }: { subject: SubjectType }) {
  return (
    <>
      <Card className=" relative flex items-center justify-center bg-gray-300 border-none shadow-none rounded-none">
        <CardContent className="p-0">
          <div className="w-[21rem] h-[19rem] bg-transparent">
            <Image src={subject.icon} alt="cardImage" width={336} height={300} />
          </div>
        </CardContent>
        <CardFooter className="w-full absolute bottom-3  bg-transparent px-3">
          <Link href={"/exams"} className="w-full p-4 text-white bg-[#155DFC]/50">
            {subject.name}
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
