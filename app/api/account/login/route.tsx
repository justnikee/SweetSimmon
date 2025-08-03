import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email = body.email;
  const userPass = body.password;

  //check if the email exist on the db
  const checkUser = await prisma.user.findUnique({ where: { email } });

  if (!checkUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const isMatch = await bcrypt.compare(userPass, checkUser.password);
  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  const { password: _, ...userWithoutPassword } = checkUser;

  return NextResponse.json({ success: true, user: userWithoutPassword });
}
