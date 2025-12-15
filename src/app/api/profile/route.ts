import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
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
  });
}
