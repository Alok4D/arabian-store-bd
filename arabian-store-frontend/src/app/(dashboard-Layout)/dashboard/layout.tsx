"use client";

import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Home, 
  Receipt, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  PanelLeft, 
  LineChart, 
  Settings,
  Package
} from "lucide-react";
import { useGetProfileQuery } from "@/lib/feature/auth/authApi";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [user, setUser] = useState({ name: "Admin", role: "admin", avatar: "" });

  const { data: profileData } = useGetProfileQuery({});

  useEffect(() => {
    if (profileData?.success && profileData?.data) {
      setUser({
        name: profileData.data.name || "Admin",
        role: "admin",
        avatar: profileData.data.image || ""
      });
    }
  }, [profileData]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [pathname]);

  const routes = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/orders", label: "Orders", icon: Receipt },
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/customers", label: "Customers", icon: UserIcon },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    Cookies.remove('admin_token');
    router.push("/login");
  };

  return (
    <div className={`h-screen flex bg-white overflow-hidden ${manrope.className}`}>
      {/* Sidebar */}
      <aside className={`${isCollapsed ? "w-20" : "w-64"} bg-background border-r flex flex-col hidden md:flex shrink-0 transition-all duration-300 ease-in-out`}>
        <div className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "px-6"} border-b shrink-0 overflow-hidden`}>
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <div className="flex justify-center text-[#009e19] font-bold overflow-hidden shrink-0">
                 <Image src="https://res.cloudinary.com/dlvywmmyv/image/upload/v1783573994/arabian-store-bd/products/image-1783573993347.jpg" alt="Logo" width={50} height={50} />
            </div>
            {!isCollapsed && <span className="text-xl font-bold tracking-tight whitespace-nowrap text-[#a46404]">Arabian Store</span>}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = route.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(route.href);

            return (
              <Link
                key={route.href}
                href={route.href}
                title={isCollapsed ? route.label : undefined}
                className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-3"} py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? "bg-[#009e19]/10 text-[#009e19]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{route.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t space-y-4 shrink-0 overflow-hidden">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-3"}`}>
            <div className="w-8 h-8 rounded-full bg-[#009e19]/10 flex items-center justify-center text-[#009e19] font-bold text-xs uppercase overflow-hidden relative shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium leading-none truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</span>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size={isCollapsed ? "icon" : "default"}
            title={isCollapsed ? "Log out" : undefined}
            className="w-full justify-center text-muted-foreground hover:text-red-600 hover:bg-red-50 border-neutral-200"
            onClick={handleLogout}
          >
            <LogOut className={`h-4 w-4 shrink-0 ${isCollapsed ? "" : "mr-2"}`} />
            {!isCollapsed && "Log out"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-16 flex items-center px-6 border-b shrink-0">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <div className=" flex justify-center text-[#009e19] font-bold overflow-hidden">
                      <Package className="w-8 h-8" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#a46404]">Arabian Store</span>
                  </Link>
                </div>
                <div className="flex flex-col h-[calc(100vh-4rem)]">
                  <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {routes.map((route) => {
                      const Icon = route.icon;
                      const isActive = route.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(route.href);

                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                              ? "bg-[#009e19]/10 text-[#009e19]"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          <Icon className="h-4 w-4" />
                          {route.label}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t mt-auto space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-muted-foreground hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex shrink-0 -ml-2 text-muted-foreground hover:text-foreground">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <div className="font-bold text-lg hidden md:block">Dashboard</div>
            <div className="font-bold md:hidden">{user.name}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-medium leading-none">{user.name}</span>
                <span className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#009e19]/10 flex items-center justify-center text-[#009e19] font-bold text-xs uppercase overflow-hidden relative shrink-0">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
          <div className="w-full max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
