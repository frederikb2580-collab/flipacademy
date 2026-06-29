"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Package, Banknote } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find varer",
    description: "Lær at finde de bedste varer i genbrugsbutikker, loppemarkeder og online.",
  },
  {
    icon: TrendingUp,
    title: "Vurdér prisen",
    description: "Forstå markedet og lær at vurdere hvad tøj kan sælges for.",
  },
  {
    icon: Package,
    title: "List og sælg",
    description: "Optimer dine annoncer på Vinted, DBA og Facebook Marketplace.",
  },
  {
    icon: Banknote,
    title: "Tjén profit",
    description: "Skalér din forretning og byg en stabil indkomst fra tøjflipping.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Sådan virker det
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Fire simple trin til at starte din tøjflipping-forretning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 mb-6">
                <step.icon className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-xs font-medium text-purple-400 mb-2">
                Trin {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
