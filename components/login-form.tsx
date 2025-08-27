"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext"; // Use the context
import { GoogleAuthButton } from "@/app/components/googleAuthButton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const UserSchema = z.object({
  email: z.email("Must be valid Email"),
  password: z.string().min(1, "Please enter password"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { user } = useAuth(); // Get user from context
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const loginInfo = { email, password };
    const validateLogin = UserSchema.safeParse(loginInfo);

    if (!validateLogin.success) {
      const errors: { [key: string]: string } = {};
      const fieldErrors = validateLogin.error.flatten().fieldErrors;

      Object.entries(fieldErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          errors[key] = messages[0];
        }
      });

      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const { supabase } = await import("@/lib/supabaseClient");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setFormErrors({ submit: error.message });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormErrors({ submit: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <p className="text-center mt-2.5">Or</p>
            <div className="mt-2.5">
              <GoogleAuthButton />
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/account/register"
                className="underline underline-offset-4"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
