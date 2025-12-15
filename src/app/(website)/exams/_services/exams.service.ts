import { ExamsResponse, ExamsType } from "@/lib/types/exams";

export default async function getExamsService() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/exams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<ExamsResponse<ExamsType>> = await response.json();

  return payload;
}
