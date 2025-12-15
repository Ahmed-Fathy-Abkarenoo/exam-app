import getExamByIdService from "@/app/(website)/exams/[id]/_services/exam-by-id.service";

export const getExamById = async (id: string) => {
  const payload = await getExamByIdService(id);

  if ("code" in payload || payload.message !== "success") {
    throw new Error(payload?.message);
  }

  return payload;
};
