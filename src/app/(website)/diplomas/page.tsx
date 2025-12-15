import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Diplomas from "./_components/diplomas";
import { getSubjects } from "@/lib/api/get-subjects";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    staleTime: 20 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Diplomas />
    </HydrationBoundary>
  );
}
