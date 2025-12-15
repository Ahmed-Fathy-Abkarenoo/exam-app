import { QuestionsResponse } from "@/lib/types/exams";

export default async function getquestiosByExamService(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/questions?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fail to fetch");
  }

  const payload: ApiResponse<QuestionsResponse> = await response.json();

  if ("code" in payload || !(payload.message === "success")) {
    throw new Error(payload?.message);
  }

  return payload;
}
