import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name || !body.email || !body.projectType || !body.message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Inquiry received.",
  });
}
