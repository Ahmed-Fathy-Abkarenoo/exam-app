import { Progress } from "@/components/ui/progress";
import QuestioFooter from "./footer";
import QuestionHeader from "./header";
import QuestionDetails from "./question-details";

export default function Question() {
  return (
    <>
      <QuestionHeader />

      <section className="flex flex-col gap-4 p-6">
        <Progress value={20} />

        <QuestionDetails />

        <QuestioFooter />
      </section>
    </>
  );
}
