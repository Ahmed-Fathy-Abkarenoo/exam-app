import { ExamsType } from "@/lib/types/exams";

export default async function getExamByIdService(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/exam-by-id?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<ExamsType> = await response.json();

  return { ...payload };
}
