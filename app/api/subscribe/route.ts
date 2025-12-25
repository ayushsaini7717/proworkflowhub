import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, source } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Invalid email" },
      { status: 400 }
    );
  }

  try {
    await prisma.subscriber.create({
      data: {
        email,
        source,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Ignore duplicate emails
    console.log("Subscription error:", err);
    return NextResponse.json({ success: true });
  }
}
