"use client";

import Swal from "sweetalert2";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, User, Lock, Save, Camera, Truck, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation } from "@/lib/feature/auth/authApi";
import { useGetShippingQuery, useUpdateShippingMutation } from "@/lib/feature/shipping/shippingApi";

export default function SettingsPage() {
  
  const router = useRouter();
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [shippingData, setShippingData] = useState({ insideDhaka: 80, outsideDhaka: 130 });
  const [shippingSaving, setShippingSaving] = useState(false);

  const { data: profileResponse, isLoading: isLoadingProfile } = useGetProfileQuery({});
  const { data: shippingResponse, isLoading: isLoadingShipping } = useGetShippingQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updateShipping] = useUpdateShippingMutation();

  const isLoading = isLoadingProfile || isLoadingShipping;

  useEffect(() => {
    if (profileResponse?.success) {
      setProfileData({ name: profileResponse.data.name, email: profileResponse.data.email });
      if (profileResponse.data.image) {
        setImagePreview(profileResponse.data.image);
      }
    }
  }, [profileResponse]);

  useEffect(() => {
    if (shippingResponse?.success && shippingResponse?.data) {
      setShippingData({
        insideDhaka: Number(shippingResponse.data.insideDhaka),
        outsideDhaka: Number(shippingResponse.data.outsideDhaka),
      });
    }
  }, [shippingResponse]);

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

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
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
      setProfileSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch!",
        text: "New password and confirm password do not match.",
        confirmButtonColor: "#d33",
      });
      return;
    }
    setPasswordSaving(true);
    try {
      const data = await updatePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      
      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Password Updated!",
          text: "Your password has been changed. Please login again.",
          confirmButtonColor: "#009e19",
          timer: 2500,
          timerProgressBar: true,
        });
        router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Failed to update password",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Error updating password",
        confirmButtonColor: "#d33",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleUpdateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    setShippingSaving(true);
    try {
      const data = await updateShipping({
        insideDhaka: shippingData.insideDhaka,
        outsideDhaka: shippingData.outsideDhaka,
      }).unwrap();
      
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Shipping Updated!",
          text: "Shipping settings have been updated successfully.",
          confirmButtonColor: "#2563eb",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Failed to update shipping settings",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Error updating shipping settings",
        confirmButtonColor: "#d33",
      });
    } finally {
      setShippingSaving(false);
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
                <div className="relative">
                  <input 
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    required
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full p-2 pr-10 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    minLength={6}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full p-2 pr-10 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    minLength={6}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full p-2 pr-10 border rounded-md outline-none focus:border-red-500 bg-neutral-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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

        {/* Shipping Settings */}
        <Card className="border-[#faecd8]">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Shipping Settings
            </CardTitle>
            <CardDescription>Configure delivery charges for different areas.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateShipping} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Inside Dhaka (৳)</label>
                <input 
                  type="number" 
                  name="insideDhaka"
                  required
                  min="0"
                  value={shippingData.insideDhaka}
                  onChange={handleShippingChange}
                  placeholder="e.g. 80"
                  className="w-full p-2 border rounded-md outline-none focus:border-blue-500 bg-neutral-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Outside Dhaka (৳)</label>
                <input 
                  type="number" 
                  name="outsideDhaka"
                  required
                  min="0"
                  value={shippingData.outsideDhaka}
                  onChange={handleShippingChange}
                  placeholder="e.g. 130"
                  className="w-full p-2 border rounded-md outline-none focus:border-blue-500 bg-neutral-50"
                />
              </div>
              <button 
                type="submit" 
                disabled={shippingSaving}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {shippingSaving ? "Updating..." : <><Save className="w-4 h-4" /> Update Shipping</>}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
