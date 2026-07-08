"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Lock, Mail, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import '../../globals.css';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@arabianstore.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        Cookies.set('admin_token', data.token, { expires: 1 });
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Package className="w-12 h-12 text-[#e35a34]" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Arabian Store Dashboard
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-[#e35a34] focus:border-[#e35a34] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none"
                      placeholder="admin@arabianstore.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:ring-[#e35a34] focus:border-[#e35a34] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e35a34] hover:bg-[#d04925] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e35a34] disabled:opacity-50 transition-colors"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
