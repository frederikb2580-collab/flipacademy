"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Clock } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Studerende",
    description:
      "Perfekt sideindtægt ved siden af studiet. Fleksibel arbejdstid og god indtjening.",
  },
  {
    icon: Briefcase,
    title: "Lønmodtagere",
    description:
      "Byg en sideforretning op i din fritid. Start småt og skalér når du er klar.",
  },
  {
    icon: Rocket,
    title: "Iværksættere",
    description:
      "Lav kapital til at starte? Tøjflipping kræver minimal investering og giver hurtig ROI.",
  },
  {
    icon: Clock,
    title: "Alle med fritid",
    description:
      "Du bestemmer selv hvornår og hvor meget du vil arbejde. Ingen boss, ingen deadlines.",
  },
];

export function WhoIsItFor() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Hvem er kurset til?
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Kurset er designet til alle der vil tjene penge på tøjflipping — uanset erfaring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:border-purple-500/30 transition-all hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-4">
                <item.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
