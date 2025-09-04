"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  avatar_url?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const profileRef = useRef<Profile | null>(null);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const getProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        if (error.code === "PGRST116") {
          console.log("Profile not found for user:", userId);
          return null;
        }
        throw error;
      }

      console.log("Profile fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      console.log("Refreshing profile for user:", user.id);
      const profileData = await getProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    let isMounted = true;
    let hasInitialized = false;

    const initializeAuth = async () => {
      if (hasInitialized) return;
      hasInitialized = true;

      console.log("🚀 Starting auth initialization...");

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Session error:", error);
        } else if (session?.user && isMounted) {
          console.log("✅ Found user:", session.user.id);
          setUser(session.user);

          const profileData = await getProfile(session.user.id);
          if (isMounted) {
            setProfile(profileData);
          }
        } else {
          console.log("ℹ️ No active session");
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("❌ Auth initialization failed:", error);
      } finally {
        if (isMounted) {
          console.log("🎯 Setting loading to FALSE");
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth event:", event);

      if (!isMounted) return;

      if (event === "SIGNED_IN" && session?.user) {
        console.log("👤 User signed in:", session.user.id);
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        console.log("👋 User signed out");
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      console.log("🧹 Cleanup AuthProvider");
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("Signing out...");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch (error) {
      console.error("Unexpected sign out error:", error);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  console.log("AuthContext render:", {
    hasUser: !!user,
    hasProfile: !!profile,
    loading,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
