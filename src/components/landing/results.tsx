"use client";

import { motion } from "framer-motion";

const results = [
  {
    name: "Mathias K.",
    amount: "12.500 DKK",
    period: "første måned",
    quote: "Jeg startede med 500 kr. og havde tjent 12.500 kr. på den første måned. Kurset gav mig alt jeg havde brug for.",
  },
  {
    name: "Sarah L.",
    amount: "8.000 DKK",
    period: "pr. måned",
    quote: "Som studerende er dette den perfekte sideindtægt. Jeg arbejder 10 timer om ugen og tjener konsekvent 8.000 kr.",
  },
  {
    name: "Anders P.",
    amount: "25.000 DKK",
    period: "bedste måned",
    quote: "Efter 3 måneder med kurset havde jeg min bedste måned nogensinde. Det handler om at finde de rigtige varer.",
  },
];

export function Results() {
  return (
    <section id="resultater" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Resultater fra vores elever
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Se hvad vores elever har opnået efter at have gennemført kurset
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={result.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8"
            >
              <div className="mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {result.amount}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {result.period}
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic">
                &ldquo;{result.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  {result.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white">
                  {result.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
