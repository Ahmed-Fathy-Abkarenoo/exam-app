"use client";

import Loading from "../../loading";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getExams } from "@/lib/api/get-exams";
import { BookOpenCheck, ChevronLeft } from "lucide-react";
import ExamList from "./exam-llist";
import Link from "next/link";

export default function Exams() {
  const { isLoading, error, data } = useSuspenseQuery({
    queryKey: ["exams"],
    queryFn: () => getExams(),
  });

  return (
    <>
      <header className="flex items-center gap-2">
        <div className="border border-blue-600 bg-white py-4 px-2">
          <Link href={"/diplomas"}>
            <ChevronLeft className="text-blue-600" />
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-grow p-4 bg-blue-600 text-white border border-blue-600">
          <BookOpenCheck />
          <h1>Exams</h1>
        </div>
      </header>
      <section>
        {isLoading && !error ? (
          <Loading />
        ) : (
          <div className="h-full flex flex-col items-center bg-white p-4">
            <ul className="w-full space-y-4">
              {data?.exams.map((exam) => (
                <ExamList key={exam._id} examData={exam} />
              ))}
            </ul>
            <p className="w-full text-gray-600 text-center mt-4 mb-32">End of list</p>
          </div>
        )}
      </section>
    </>
  );
}
