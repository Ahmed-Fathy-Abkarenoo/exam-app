import { profileFields, ProfileResponse } from "@/lib/types/auth";

export default async function updateAccountService(fields: profileFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/profile`, {
    method: "PUT",
    body: JSON.stringify({ ...fields }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<ProfileResponse> = await response.json();

  return payload;
}
