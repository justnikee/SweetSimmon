// lib/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
        // Handle case where profile doesn't exist (new user)
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
    let isMounted = true; // Prevent state updates if component unmounts
    let isInitialized = false; // Prevent double initialization

    const initializeAuth = async () => {
      if (isInitialized) return;
      isInitialized = true;

      try {
        console.log("Initializing auth...");

        // Get initial session with error handling
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          if (isMounted) {
            setLoading(false);
          }
          return;
        }

        if (session?.user && isMounted) {
          console.log("Found existing session for user:", session.user.id);
          setUser(session.user);

          // Get profile data
          const profileData = await getProfile(session.user.id);
          if (isMounted) {
            setProfile(profileData);
          }
        }

        if (isMounted) {
          setLoading(false);
        }

        console.log("Auth initialization complete");
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, "User ID:", session?.user?.id);

      if (!isMounted) {
        console.log("Component unmounted, ignoring auth state change");
        return;
      }

      try {
        if (session?.user) {
          console.log("Setting user from auth state change:", session.user.id);
          setUser(session.user);

          // Only fetch profile if we don't have it or user changed
          if (!profile || profile.id !== session.user.id) {
            const profileData = await getProfile(session.user.id);
            if (isMounted) {
              setProfile(profileData);
            }
          }
        } else {
          console.log("No session, clearing user and profile");
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up AuthProvider");
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array

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
