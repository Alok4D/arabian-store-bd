"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, User, Lock, Save, Camera } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/profile`);
      const data = await res.json();
      if (data.success) {
        setProfileData({ name: data.data.name, email: data.data.email });
        if (data.data.image) {
          setImagePreview(data.data.image);
        }
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      if (profileImage) {
        formData.append("image", profileImage);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/profile`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        // Update local storage if necessary, then refresh page to apply layout changes
        window.location.reload(); 
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setPasswordSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Password updated successfully! Please login again.");
        router.push("/login"); // Force login after password change
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center text-neutral-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#a46404] flex items-center gap-2">
          <Settings className="w-8 h-8" /> Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="border-[#faecd8]">
          <CardHeader>
            <CardTitle className="text-[#a46404] flex items-center gap-2">
              <User className="w-5 h-5" /> Profile Settings
            </CardTitle>
            <CardDescription>Update your admin account details and profile picture.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              
              {/* Image Upload Area */}
              <div className="flex flex-col items-center justify-center pb-4">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#009e19] bg-neutral-100 flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-neutral-400" />
                    )}
                  </div>
                  <label htmlFor="profileImage" className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6" />
                  </label>
                  <input 
                    type="file" 
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2">Click to change profile picture</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md outline-none focus:border-[#009e19] bg-neutral-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md outline-none focus:border-[#009e19] bg-neutral-50"
                />
              </div>
              <button 
                type="submit" 
                disabled={profileSaving}
                className="w-full mt-4 bg-[#009e19] hover:bg-[#008a16] text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {profileSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Profile</>}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Security / Password */}
        <Card className="border-[#faecd8]">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Security
            </CardTitle>
            <CardDescription>Change your admin password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Current Password</label>
                <input 
                  type="password" 
                  name="oldPassword"
                  required
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full p-2 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">New Password</label>
                <input 
                  type="password" 
                  name="newPassword"
                  required
                  minLength={6}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full p-2 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                />
              </div>
              <button 
                type="submit" 
                disabled={passwordSaving}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {passwordSaving ? "Updating..." : <><Lock className="w-4 h-4" /> Change Password</>}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
