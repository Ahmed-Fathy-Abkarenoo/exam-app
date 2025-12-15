import { ChangePasswordFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import changePasswordService from "../_services/change-password.service";

export default function useChangePassword() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const payload = await changePasswordService(fields);

      console.log(payload);

      if ("code" in payload) {
        throw new Error(payload?.message);
      }

      return payload;
    },
  });

  return { isPending, error, changePassword: mutate };
}
