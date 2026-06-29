"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Introduktion",
    lessons: ["Hvad er tøjflipping?", "Mindset og forventninger", "Udstyr du skal bruge"],
  },
  {
    number: "02",
    title: "Find varer",
    lessons: ["Genbrugsbutikker", "Loppemarkeder", "Online sourcing", "Hvad skal du kigge efter"],
  },
  {
    number: "03",
    title: "Prisvurdering",
    lessons: ["Mærkekendskab", "Markedsanalyse", "Prisstrategier"],
  },
  {
    number: "04",
    title: "Facebook Marketplace",
    lessons: ["Optimér din profil", "Fotografi tips", "Salgsteknikker"],
  },
  {
    number: "05",
    title: "Vinted",
    lessons: ["Setup og profil", "Listning af varer", "Bump-strategi", "International salg"],
  },
  {
    number: "06",
    title: "DBA",
    lessons: ["Annonce optimering", "Kommunikation", "Sikker handel"],
  },
  {
    number: "07",
    title: "Fragt og logistik",
    lessons: ["Forsendelsesmetoder", "Emballering", "Prisberegning"],
  },
  {
    number: "08",
    title: "Skalering",
    lessons: ["Automatisering", "Ansættelse", "Opbyg et brand", "Skab passiv indkomst"],
  },
];

export function WhatYouLearn() {
  return (
    <section id="kurset" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Hvad du lærer
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            8 moduler med 50+ lektioner der tager dig fra begynder til professionel flipper
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {mod.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {mod.title}
                  </h3>
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
