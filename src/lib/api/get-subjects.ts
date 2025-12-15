import getSubjectsService from "@/app/(website)/diplomas/_services/diplomas.service";

export const getSubjects = async () => {
  const payload = await getSubjectsService();

  if ("code" in payload || !("metadata" in payload)) {
    throw new Error(payload?.message || "in-valid token hahahahahaha");
  }

  return payload;
};
