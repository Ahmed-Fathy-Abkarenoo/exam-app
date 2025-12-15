import { OtpField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import verifyOtpService from "../_services/verify-otp.service";

export default function useVerifyOTP() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: OtpField) => {
      const payload = await verifyOtpService(fields);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isPending, error, verifyOtp: mutate };
}
