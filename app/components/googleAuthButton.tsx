"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function GoogleAuthButton() {
  const supabase = createClientComponentClient();
  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    }
  }

  return (
    <>
      <Button className="w-full" onClick={handleLogin}>
        Continue with Google
      </Button>
    </>
  );
}
