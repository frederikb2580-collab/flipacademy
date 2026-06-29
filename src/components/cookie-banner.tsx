"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "flipacademy-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    const all = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(all));
    setVisible(false);
  }

  function acceptSelected() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
    setVisible(false);
  }

  function rejectAll() {
    const minimal = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(minimal));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Cookie className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-2">
                  Vi bruger cookies
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Vi bruger cookies for at sikre den bedste oplevelse på vores
                  hjemmeside. Nødvendige cookies er påkrævet for at siden
                  fungerer. Du kan vælge at acceptere eller afvise valgfrie
                  cookies.{" "}
                  <Link
                    href="/cookiepolitik"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Læs vores cookiepolitik
                  </Link>
                </p>

                {showDetails && (
                  <div className="space-y-3 mb-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Nødvendige cookies
                        </p>
                        <p className="text-xs text-gray-500">
                          Påkrævet for login, kurser og betaling
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="h-4 w-4 rounded accent-purple-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Analytiske cookies
                        </p>
                        <p className="text-xs text-gray-500">
                          Hjælper os med at forstå hvordan siden bruges
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={consent.analytics}
                        onChange={(e) =>
                          setConsent({ ...consent, analytics: e.target.checked })
                        }
                        className="h-4 w-4 rounded accent-purple-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Marketing cookies
                        </p>
                        <p className="text-xs text-gray-500">
                          Bruges til at vise relevante annoncer
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={(e) =>
                          setConsent({ ...consent, marketing: e.target.checked })
                        }
                        className="h-4 w-4 rounded accent-purple-500"
                      />
                    </label>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button onClick={acceptAll} size="sm">
                    Acceptér alle
                  </Button>
                  {showDetails ? (
                    <Button onClick={acceptSelected} variant="secondary" size="sm">
                      Gem valg
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowDetails(true)}
                      variant="secondary"
                      size="sm"
                    >
                      Tilpas
                    </Button>
                  )}
                  <Button onClick={rejectAll} variant="ghost" size="sm">
                    Kun nødvendige
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
