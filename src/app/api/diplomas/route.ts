import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  const response = await fetch(`${process.env.API}/subjects`, {
    method: "GET",
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
