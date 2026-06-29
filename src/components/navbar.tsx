"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500" />
            <span className="text-xl font-bold text-white">FlipAcademy</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#kurset"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Kurset
            </Link>
            <Link
              href="/#resultater"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Resultater
            </Link>
            <Link
              href="/#pris"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Pris
            </Link>
            <Link
              href="/#faq"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>

            {session ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                {session.user.role === "ADMIN" && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log ud
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Log ind</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/#pris">Køb adgang</Link>
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/#kurset"
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Kurset
              </Link>
              <Link
                href="/#resultater"
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Resultater
              </Link>
              <Link
                href="/#pris"
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Pris
              </Link>
              <Link
                href="/#faq"
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                FAQ
              </Link>
              <div className="border-t border-white/10 pt-3 space-y-2">
                {session ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                    >
                      Log ud
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        Log ind
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/#pris" onClick={() => setMobileOpen(false)}>
                        Køb adgang
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
