"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingBag,
  BarChart3,
  Tag,
  Link2,
  Mail,
  MessageSquare,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Oversigt", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Kurser", icon: BookOpen },
  { href: "/admin/users", label: "Brugere", icon: Users },
  { href: "/admin/orders", label: "Ordrer", icon: ShoppingBag },
  { href: "/admin/analytics", label: "Statistik", icon: BarChart3 },
  { href: "/admin/coupons", label: "Rabatkoder", icon: Tag },
  { href: "/admin/affiliates", label: "Affiliates", icon: Link2 },
  { href: "/admin/emails", label: "Emails", icon: Mail },
  { href: "/admin/discord", label: "Discord", icon: MessageSquare },
  { href: "/admin/logs", label: "Logs", icon: FileText },
  { href: "/admin/settings", label: "Indstillinger", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-56 lg:flex-col">
        <div className="flex flex-1 flex-col border-r border-white/10 bg-black/50">
          <div className="flex h-14 items-center px-4 border-b border-white/10">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-purple-400 px-3 py-2">
              ADMIN
            </p>
          </div>
          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-purple-500/15 text-purple-300"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="lg:pl-56">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
