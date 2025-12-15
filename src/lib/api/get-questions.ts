import getquestiosByExamService from "@/app/(website)/exams/[id]/_services/questions-by-exam.service";

export const getQuestionsByExam = async (id: string) => {
  const payload = await getquestiosByExamService(id);

  if ("code" in payload || !(payload.message === "success")) {
    throw new Error(payload?.message);
  }

  return payload;
};
