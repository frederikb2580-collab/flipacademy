"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Hvad er tøjflipping?",
    answer:
      "Tøjflipping er at købe tøj billigt (fx i genbrugsbutikker eller online) og sælge det videre til en højere pris på platforme som Vinted, DBA og Facebook Marketplace.",
  },
  {
    question: "Hvor meget kan man tjene?",
    answer:
      "Det afhænger af din indsats. Vores elever tjener typisk mellem 3.000-15.000 kr. om måneden som sideindtægt. Nogle har skaleret det til en fuldtidsbeskæftigelse.",
  },
  {
    question: "Kræver det meget startkapital?",
    answer:
      "Nej! Du kan starte med så lidt som 200-500 kr. Kurset lærer dig at finde de bedste deals og maksimere din profit fra dag ét.",
  },
  {
    question: "Er der en pengene-tilbage-garanti?",
    answer:
      "Ja, vi tilbyder 14 dages fuld pengene-tilbage-garanti. Hvis du ikke er tilfreds, refunderer vi hele beløbet.",
  },
  {
    question: "Hvor lang tid tager kurset at gennemføre?",
    answer:
      "Kurset kan gennemføres i dit eget tempo. De fleste gennemfører det på 1-2 uger, men du har lifetime adgang og kan gense indholdet så mange gange du vil.",
  },
  {
    question: "Får jeg adgang til Discord-communityet?",
    answer:
      "Ja! Når du køber kurset får du automatisk adgang til vores eksklusive Discord-community hvor du kan netværke med andre flippere, stille spørgsmål og dele dine resultater.",
  },
  {
    question: "Hvad hvis jeg aldrig har solgt noget online før?",
    answer:
      "Kurset starter helt fra bunden. Vi guider dig igennem alt — fra at oprette profiler til at tage billeder, skrive annoncer og håndtere forsendelse.",
  },
  {
    question: "Er det lovligt?",
    answer:
      "Ja, tøjflipping er helt lovligt. Vi gennemgår også de skattemæssige regler så du kan drive din forretning korrekt.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ofte stillede spørgsmål
          </h2>
          <p className="mt-4 text-gray-400">
            Har du spørgsmål? Vi har svarene.
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-4 text-left text-white hover:bg-white/5 transition-colors group">
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-4 text-sm text-gray-400 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
