import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function createJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

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
  const token = await createJWT({
    name: checkUser.name,
    email: checkUser.email,
  });

  const response = NextResponse.json({
    success: true,
    user: userWithoutPassword,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
