export default async function deleteAccountService() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/delete-account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<"SuccessResponse"> = await response.json();

  return payload;
}
