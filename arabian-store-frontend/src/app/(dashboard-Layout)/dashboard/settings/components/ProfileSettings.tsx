"use client";

import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Save, Camera } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/feature/auth/authApi";

export default function ProfileSettings() {
  
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: profileResponse } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileResponse?.success) {
      setProfileData({
        name: profileResponse.data.name,
        email: profileResponse.data.email,
      });
      if (profileResponse.data.image) {
        setImagePreview(profileResponse.data.image);
      }
    }
  }, [profileResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      if (profileImage) formData.append("image", profileImage);

      const data = await updateProfile(formData).unwrap();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#009e19",
          timer: 2000,
          timerProgressBar: true,
        });
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Failed to update profile",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Error updating profile",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-[#faecd8]">
      <CardHeader>
        <CardTitle className="text-[#a46404] flex items-center gap-2">
          <User className="w-5 h-5" /> Profile Settings
        </CardTitle>
        <CardDescription>Update your admin account details and profile picture.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center pb-4">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#009e19] bg-neutral-100 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-neutral-400" />
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full p-2 border rounded-md outline-none focus:border-[#009e19] bg-neutral-50"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 bg-[#009e19] hover:bg-[#008a16] text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Profile</>}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
