import { useMutation } from "@tanstack/react-query";
import updateAccountService from "../_services/update-info.service";
import { profileFields } from "@/lib/types/auth";

export default function useUpdateAccount() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: profileFields) => {
      const payload = await updateAccountService(fields);
      if ("code" in payload) {
        throw new Error(payload?.message);
      }
      return payload;
    },
  });

  return { isPending, error, updateAccount: mutate };
}
