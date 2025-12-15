import { NewPasswordFields, NewPasswordResponse } from "./../../../../lib/types/auth.d";

export default async function newPasswordService(fields: NewPasswordFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify({
      email: fields.email,
      newPassword: fields.rePassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<NewPasswordResponse> = await response.json();

  return payload;
}
