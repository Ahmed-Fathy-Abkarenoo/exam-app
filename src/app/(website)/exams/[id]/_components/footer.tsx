import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuestioFooter() {
  return (
    <div className="w-full flex items-center justify-center gap-3 pt-6">
      <Button type="button" className="w-1/2">
        <ChevronLeft />
        Previous
      </Button>
      <Button type="button" className="w-1/2">
        Next
        <ChevronRight />
      </Button>
    </div>
  );
}
