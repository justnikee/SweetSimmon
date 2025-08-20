"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export type User = {
  name: string;
  email: string;
};

export async function getUserFromToken(): Promise<User | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (typeof payload.name === "string" && typeof payload.email === "string") {
      return {
        name: payload.name,
        email: payload.email,
      };
    }

    return null;
  } catch (err) {
    return null;
  }
}
