"use client";

import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, Save } from "lucide-react";
import { useGetShippingQuery, useUpdateShippingMutation } from "@/lib/feature/shipping/shippingApi";

export default function ShippingSettings() {
  const [saving, setSaving] = useState(false);
  const [shippingData, setShippingData] = useState({ insideDhaka: 80, outsideDhaka: 130 });

  const { data: shippingResponse } = useGetShippingQuery({});
  const [updateShipping] = useUpdateShippingMutation();

  useEffect(() => {
    if (shippingResponse?.success && shippingResponse?.data) {
      setShippingData({
        insideDhaka: Number(shippingResponse.data.insideDhaka),
        outsideDhaka: Number(shippingResponse.data.outsideDhaka),
      });
    }
  }, [shippingResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
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
      setSaving(false);
    }
  };

  return (
    <Card className="border-[#faecd8]">
      <CardHeader>
        <CardTitle className="text-blue-600 flex items-center gap-2">
          <Truck className="w-5 h-5" /> Shipping Settings
        </CardTitle>
        <CardDescription>Configure delivery charges for different areas.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Inside Dhaka (৳)</label>
            <input
              type="number"
              name="insideDhaka"
              required
              min="0"
              value={shippingData.insideDhaka}
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="e.g. 130"
              className="w-full p-2 border rounded-md outline-none focus:border-blue-500 bg-neutral-50"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Updating..." : <><Save className="w-4 h-4" /> Update Shipping</>}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
