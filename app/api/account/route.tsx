import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const hashedPass = await bcrypt.hash(body.password, saltRounds);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPass,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
