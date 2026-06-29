"use client";

import { motion } from "framer-motion";
import { Bot, BookOpen, Users, RefreshCw } from "lucide-react";

export function AIDisclaimer() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-8"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Transparens: Dette er et AI-genereret kursus
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Vi tror på fuld gennemsigtighed. Alt kursusindhold er skabt med
                kunstig intelligens og er baseret på research og viden om
                tøjflipping i Danmark. Indholdet er gennemgået og kureret for at
                sikre kvalitet og relevans.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <BookOpen className="h-4 w-4 text-blue-400 shrink-0" />
                  100 moduler med dybdegående indhold
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Users className="h-4 w-4 text-blue-400 shrink-0" />
                  Ægte fællesskab med rigtige mennesker
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <RefreshCw className="h-4 w-4 text-blue-400 shrink-0" />
                  Løbende opdateringer og forbedringer
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
