import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("sellerToken", "", {
    expires: new Date(0),
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  response.cookies.set("verifyToken", "", {
    expires: new Date(0),
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  return response;
}
