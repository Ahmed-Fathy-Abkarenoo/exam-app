import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/changePassword`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
      token: `${token?.accessToken}`,
    },
  });

  const payload = await response.json();

  if ("code" in payload) {
    return NextResponse.json({ ...payload }, { status: response.status });
  }

  return NextResponse.json(payload, {
    status: response.status,
    statusText: response.statusText,
  });
}
