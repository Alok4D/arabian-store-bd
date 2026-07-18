"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdatePasswordMutation } from "@/lib/feature/auth/authApi";

export default function SecuritySettings() {
  
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updatePassword] = useUpdatePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setSaving(true);
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
          confirmButtonColor: "#008013",
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
      setSaving(false);
    }
  };

  return (
    <Card className="border-[#faecd8]">
      <CardHeader>
        <CardTitle className="text-red-600 flex items-center gap-2">
          <Lock className="w-5 h-5" /> Security
        </CardTitle>
        <CardDescription>Change your admin password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Current Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                required
                value={passwordData.oldPassword}
                onChange={handleChange}
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

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                required
                minLength={6}
                value={passwordData.newPassword}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                minLength={6}
                value={passwordData.confirmPassword}
                onChange={handleChange}
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
            disabled={saving}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Updating..." : <><Lock className="w-4 h-4" /> Change Password</>}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
