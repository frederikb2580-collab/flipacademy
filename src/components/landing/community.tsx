"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

const perks = [
  {
    icon: Users,
    title: "Eksklusivt fællesskab",
    description:
      "Kun for betalende medlemmer. Del dine fund, stil spørgsmål og lær af andre flippere.",
  },
  {
    icon: MessageSquare,
    title: "Direkte hjælp",
    description:
      "Få svar på dine spørgsmål fra fællesskabet. Er denne vare noget værd? Hvad skal jeg sætte prisen til?",
  },
  {
    icon: Shield,
    title: "Automatisk adgang",
    description:
      "Når du køber kurset, får du automatisk adgang til Discord-serveren. Ingen ekstra trin.",
  },
  {
    icon: Zap,
    title: "Tips og tricks dagligt",
    description:
      "Medlemmer deler dagligt deres bedste fund, profit-screenshots og strategier.",
  },
];

export function Community() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <MessageSquare className="h-4 w-4" />
            Kun for medlemmer
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Discord-fællesskabet
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Kurset er kun halvdelen. Den anden halvdel er fællesskabet.
            Forbind med andre flippere, del dine resultater og lær af hinanden.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-indigo-500/30 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <perk.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {perk.title}
              </h3>
              <p className="text-sm text-gray-400">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
