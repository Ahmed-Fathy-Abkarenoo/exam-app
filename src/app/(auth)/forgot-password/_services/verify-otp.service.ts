import { OtpField, VerifyOTPResponse } from "./../../../../lib/types/auth.d";

export default async function verifyOtpService(fields: OtpField) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify({
      resetCode: fields.resetCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<VerifyOTPResponse> = await response.json();

  return payload;
}
