"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const features = [
  "8+ moduler med 50+ lektioner",
  "Video, tekst og PDF materiale",
  "Lifetime adgang",
  "Gratis opdateringer",
  "Discord community adgang",
  "Direkte support",
  "Downloadbare ressourcer",
  "Quizzer og opgaver",
];

export function Pricing() {
  return (
    <section id="pris" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Én pris. Lifetime adgang.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Ingen abonnementer. Ingen skjulte gebyrer. Betal én gang og få adgang for evigt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-sm p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-bl-lg">
              LIFETIME
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                FlipAcademy Kursus
              </h3>
              <p className="text-gray-400 text-sm">
                Alt hvad du behøver for at starte med tøjflipping
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">399</span>
                <span className="text-xl text-gray-400">DKK</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Engangsbetaling</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20">
                    <Check className="h-3 w-3 text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="xl" className="w-full" asChild>
              <Link href="/api/stripe/checkout">
                <Zap className="mr-2 h-5 w-5" />
                Køb Lifetime Adgang — 399 DKK
              </Link>
            </Button>

            <p className="text-center text-xs text-gray-500 mt-4">
              14 dages pengene-tilbage-garanti
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
