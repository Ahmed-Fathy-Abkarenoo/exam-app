import { ForgotPasswordField, ForgotPasswordResponse } from "./../../../../lib/types/auth.d";

export default async function forgotPasswordService(fields: ForgotPasswordField) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify({
      email: fields.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<ForgotPasswordResponse> = await response.json();

  return payload;
}
