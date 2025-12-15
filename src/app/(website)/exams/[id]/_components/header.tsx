"use client";

import { getExamById } from "@/lib/api/get-exam";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function QuestionHeader() {
  // Hooks
  const params = useParams<{ id: string }>();

  //Queries
  const { data } = useSuspenseQuery({
    queryKey: ["examById"],
    queryFn: () => getExamById(params.id),
  });

  return (
    <header className="flex items-center gap-2">
      <div className="border border-blue-600 bg-white py-4 px-2">
        <Link href={"/exams"}>
          <ChevronLeft className="text-blue-600" />
        </Link>
      </div>
      <div className="flex items-center gap-3 flex-grow p-4 bg-blue-600 text-white border border-blue-600">
        <CircleQuestionMark />
        <h1>{`[${data?.exam.title}]`} Questions</h1>
      </div>
    </header>
  );
}
