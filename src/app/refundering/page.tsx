import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = { title: "Refunderingspolitik" };

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Refunderingspolitik</h1>
          <p className="text-gray-400">Sidst opdateret: Juni 2026</p>

          <h2>14 dages pengene-tilbage-garanti</h2>
          <p>Vi ønsker at du er 100% tilfreds med dit køb. Hvis kurset ikke lever op til dine forventninger, tilbyder vi fuld refundering inden for 14 dage efter køb.</p>

          <h2>Sådan anmoder du om refundering</h2>
          <ol>
            <li>Send en email til <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a></li>
            <li>Angiv din email og ordrenummer</li>
            <li>Vi behandler din refundering inden for 3-5 hverdage</li>
          </ol>

          <h2>Hvad sker der ved refundering?</h2>
          <ul>
            <li>Det fulde beløb refunderes til din betalingsmetode</li>
            <li>Din adgang til kurset fjernes</li>
            <li>Din Discord-rolle fjernes automatisk</li>
            <li>Din konto forbliver aktiv (uden kursusadgang)</li>
          </ul>

          <h2>Betingelser</h2>
          <ul>
            <li>Refundering skal anmodes inden for 14 dage efter køb</li>
            <li>Refundering behandles via Stripe til den originale betalingsmetode</li>
            <li>Det kan tage 5-10 bankdage før beløbet vises på din konto</li>
          </ul>

          <h2>Kontakt</h2>
          <p>Har du spørgsmål? Skriv til <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
