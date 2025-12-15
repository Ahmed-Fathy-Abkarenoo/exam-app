import { RegisterFields, RegisterResponse } from "@/lib/types/auth";

export default async function registerService(fields: RegisterFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payLoad: ApiResponse<RegisterResponse> = await response.json();

  return payLoad;
}
