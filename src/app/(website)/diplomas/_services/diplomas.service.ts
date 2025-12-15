import { PaginatedResponse, SubjectType } from "@/lib/types/diplomas";

export default async function getSubjectsService() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/diplomas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<PaginatedResponse<SubjectType>> = await response.json();

  return payload;
}
