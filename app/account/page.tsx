"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Content } from "@radix-ui/react-accordion";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}

function AccountContent() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    country: profile?.country || "",
    postal_code: profile?.postal_code || "",
  });

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/account/login");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postal_code: formData.postal_code,
        })
        .eq("id", user?.id);

      if (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile");
      } else {
        await refreshProfile();
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Manage your personal information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Email
                </Label>
                <p className="text-lg">{profile.email}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Full Name
                </Label>
                <p className="text-lg">{profile.full_name || "Not provided"}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Phone
                </Label>
                <p className="text-lg">{profile.phone || "Not provided"}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Address
                </Label>
                <p className="text-lg">{profile.address || "Not provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    City
                  </Label>
                  <p className="text-lg">{profile.city || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    State
                  </Label>
                  <p className="text-lg">{profile.state || "Not provided"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Country
                  </Label>
                  <p className="text-lg">{profile.country || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Postal Code
                  </Label>
                  <p className="text-lg">
                    {profile.postal_code || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Member Since
                </Label>
                <p className="text-lg">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-fit mt-6 cursor-pointer"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <Label htmlFor="email">Email (Read-only)</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Country"
                  />
                </div>
                <div>
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) =>
                      setFormData({ ...formData, postal_code: e.target.value })
                    }
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardContent>
          <div className="">
            <h2>Orders</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
