import { getExams } from "@/lib/api/get-exams";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Exams from "./_components/exams";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["exams"],
    queryFn: getExams,
    staleTime: 20 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Exams />
    </HydrationBoundary>
  );
}
