"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Lock, Mail, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import '../../globals.css';
import Image from 'next/image';
import { useLoginMutation } from '@/lib/feature/auth/authApi';
import { useAppDispatch } from '@/lib/hooks/redux';
import { setUser } from '@/lib/feature/auth/authSlice';

export default function LoginPage() {

  const [email, setEmail] = useState('admin@arabianstore.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login({ email, password }).unwrap();

      if (data.success) {
        Cookies.set('admin_token', data.token, { expires: 1 });
        dispatch(setUser({ token: data.token }));
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-[#e35a34] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-10" />
        <img
          src="/medjool-texture.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="relative z-20 text-center text-white px-12 flex flex-col items-center">
          <div className="flex items-center justify-center mb-8 bg-white p-2 rounded-full">
            <img src="/single-logo.jpg" alt="Arabian Store" className="object-contain w-[120px] md:w-[150px] rounded-full shadow-lg border-2 border-white/50" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
            Arabian Store Dashboard
          </h1>
          <p className="text-lg text-white/95 max-w-md mx-auto leading-relaxed drop-shadow-md">
            Manage your premium dates, track orders, and interact with customers from one secure place.
          </p>
        </div> */}
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center lg:hidden">
            <Package className="w-12 h-12 text-[#e35a34]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-[#e35a34] focus:border-[#e35a34] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none"
                    placeholder="admin@arabianstore.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-[#e35a34] focus:border-[#e35a34] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#e35a34] hover:bg-[#d04925] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e35a34] disabled:opacity-50 transition-colors"
                >
                  {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in to Dashboard'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
