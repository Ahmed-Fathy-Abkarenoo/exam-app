import getExamsService from "@/app/(website)/exams/_services/exams.service";

export const getExams = async () => {
  const payload = await getExamsService();

  if ("code" in payload || !("metadata" in payload)) {
    throw new Error(payload?.message || "in-valid token hahahahahaha");
  }

  return payload;
};
