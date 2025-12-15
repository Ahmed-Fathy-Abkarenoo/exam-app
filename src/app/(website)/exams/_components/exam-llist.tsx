import { ExamsType } from "@/lib/types/exams";
import { Timer } from "lucide-react";
import Link from "next/link";

export default function ExamList({ examData }: { examData: ExamsType }) {
  return (
    <li>
      <Link href={`/exams/${examData._id}`} className="flex items-center justify-between bg-blue-50 p-4">
        <div className="space-y-1">
          <p className="text-xl font-semibold text-blue-600">{examData.title}</p>
          <span className="text-sm text-gray-500">{examData.numberOfQuestions} Questions</span>
        </div>
        <p className="text-sm text-gray-800 font-medium flex items-center gap-1 p-1">
          <Timer size={18} className="text-gray-400" />
          Duration: <span className="font-normal">{examData.duration} minutes</span>
        </p>
      </Link>
    </li>
  );
}
