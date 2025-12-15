import { ChangePasswordFields, NewPasswordResponse } from "@/lib/types/auth";

export default async function changePasswordService(fields: ChangePasswordFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/change-password`, {
    method: "PATCH",
    body: JSON.stringify({
      oldPassword: fields.oldPassword,
      password: fields.password,
      rePassword: fields.rePassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<NewPasswordResponse> = await response.json();

  return payload;
}
