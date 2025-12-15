import { NewPasswordFields } from "@/lib/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newPasswordService from "../_services/new-password.service";
import { useRouter } from "next/navigation";

export default function useNewPassword() {
  // Navigation
  const router = useRouter();

  //Queries
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: NewPasswordFields) => {
      const payload = await newPasswordService(fields);

      if (payload?.message !== "success") {
        throw new Error(payload?.message);
      }

      return payload;
    },
    onSuccess: () => {
      queryClient.clear();

      router.push("/login");
    },
  });

  return { isPending, error, newPassword: mutate };
}
