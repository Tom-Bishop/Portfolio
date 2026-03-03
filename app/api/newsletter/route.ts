import { NextResponse } from "next/server";

type NewsletterPayload = {
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as NewsletterPayload;

  if (!body.email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Subscription request received.",
  });
}
