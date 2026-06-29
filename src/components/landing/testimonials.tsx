"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Frederik M.",
    role: "Studerende",
    stars: 5,
    text: "Det bedste kursus jeg har taget. Alt er forklaret trin for trin, og Discord-communityet er fantastisk.",
  },
  {
    name: "Louise H.",
    role: "Fuldtidsarbejde",
    stars: 5,
    text: "Jeg var skeptisk i starten, men efter den første uge havde jeg allerede tjent kurset ind. Anbefales!",
  },
  {
    name: "Kasper N.",
    role: "Iværksætter",
    stars: 5,
    text: "Modulet om skalering var guld værd. Jeg har nu ansat en person og tjener passivt på tøjflipping.",
  },
  {
    name: "Emma S.",
    role: "Studerende",
    stars: 5,
    text: "Super god guide til Vinted! Har solgt for over 5.000 kr. internationalt takket være kurset.",
  },
  {
    name: "Mikkel J.",
    role: "Freelancer",
    stars: 5,
    text: "Kvaliteten af kurset er langt over hvad jeg forventede for prisen. Lifetime adgang gør det til et no-brainer.",
  },
  {
    name: "Ida R.",
    role: "Lønmodtager",
    stars: 5,
    text: "Discord-communityet alene er pengene værd. Man får altid svar på sine spørgsmål.",
  },
];

export function Testimonials() {
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
            Hvad vores elever siger
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Hundredvis af tilfredse elever har allerede startet deres flipping-rejse
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
