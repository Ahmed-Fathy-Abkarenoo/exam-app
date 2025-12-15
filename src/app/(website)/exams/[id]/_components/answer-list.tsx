import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AnswerType } from "@/lib/types/exams";

type PageProps = {
  answerList: AnswerType;
};

export default function AnswerList({ answerList }: PageProps) {
  return (
    <li className="flex items-center gap-3 bg-gray-50 p-4 hover:bg-slate-100">
      <Checkbox id="terms" />
      <Label htmlFor="terms">{answerList.answer}</Label>
    </li>
  );
}
