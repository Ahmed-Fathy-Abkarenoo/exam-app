import { ForgotPasswordField } from "@/lib/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import forgotPasswordService from "../_services/forgot-password.service";

export default function useForgotPassword() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ForgotPasswordField) => {
      const payload = await forgotPasswordService(fields);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["userEmail"], variables.email);
    },
  });

  return { isPending, error, forgotPassword: mutate };
}
