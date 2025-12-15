import { useMutation } from "@tanstack/react-query";
import deleteAccountService from "../_services/delete-account.service";

export default function useDeleteAccount() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const payload = await deleteAccountService();
      if ("code" in payload) {
        throw new Error(payload?.message);
      }
      return payload;
    },
  });

  return { pendingDelete: isPending, deleteError: error, deleteAccount: mutate };
}
