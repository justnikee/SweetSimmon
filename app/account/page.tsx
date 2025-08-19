import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

type User = {
  name: string;
  email: string;
};

async function getUserFromToken(): Promise<User | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    // Ensure payload contains required fields
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

const Page = async () => {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/account/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Page;
