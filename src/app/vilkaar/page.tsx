import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = { title: "Vilkår og betingelser" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Vilkår og betingelser</h1>
          <p className="text-gray-400">Sidst opdateret: Juni 2026</p>

          <h2>1. Generelt</h2>
          <p>Disse vilkår gælder for alle køb og brug af FlipAcademy DK&apos;s digitale produkter og tjenester. Ved at oprette en konto eller foretage et køb accepterer du disse vilkår.</p>

          <h2>2. Produktet</h2>
          <p>FlipAcademy sælger digitale kurser om tøjflipping. Kursusindholdet er AI-genereret og baseret på research om tøjflipping i Danmark. Vi garanterer ikke specifikke resultater eller indtjening.</p>

          <h2>3. Pris og betaling</h2>
          <ul>
            <li>Prisen for lifetime adgang er 399 DKK (engangsbetaling)</li>
            <li>Alle priser er inkl. moms</li>
            <li>Betaling behandles sikkert via Stripe</li>
            <li>Du modtager ordrebekræftelse på email efter køb</li>
          </ul>

          <h2>4. Adgang</h2>
          <ul>
            <li>Adgang gives umiddelbart efter betaling</li>
            <li>Lifetime adgang betyder adgang så længe platformen eksisterer</li>
            <li>Din konto er personlig og må ikke deles</li>
            <li>Discord-adgang gives automatisk til betalende medlemmer</li>
          </ul>

          <h2>5. AI-genereret indhold</h2>
          <p>Alt kursusindhold er genereret ved hjælp af kunstig intelligens. Vi bestræber os på at sikre kvalitet og nøjagtighed, men kan ikke garantere at alt indhold er fejlfrit. Indholdet udgør ikke professionel rådgivning.</p>

          <h2>6. Fortrydelsesret</h2>
          <p>I henhold til forbrugeraftaleloven har du 14 dages fortrydelsesret fra købsdatoen. Da der er tale om digitalt indhold, frafalder fortrydelsesretten dog når du begynder at tilgå kursusindholdet, medmindre andet er aftalt.</p>
          <p>Vi tilbyder dog 14 dages pengene-tilbage-garanti — kontakt os på <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a>.</p>

          <h2>7. Refundering</h2>
          <ul>
            <li>Refundering sker inden for 14 dage efter køb</li>
            <li>Beløbet refunderes til den betalingsmetode der blev brugt</li>
            <li>Ved refundering mister du adgang til kursus og Discord</li>
          </ul>

          <h2>8. Ophavsret</h2>
          <p>Alt indhold på FlipAcademy er beskyttet af ophavsretten. Du må ikke kopiere, distribuere eller videresælge kursusindhold uden skriftlig tilladelse.</p>

          <h2>9. Ansvarsbegrænsning</h2>
          <p>FlipAcademy er et uddannelsesprodukt og garanterer ikke specifikke resultater. Eventuel indtjening afhænger af din egen indsats, markedsforhold og andre faktorer. Vi er ikke ansvarlige for tab som følge af brug af kursets indhold.</p>

          <h2>10. Ændringer</h2>
          <p>Vi forbeholder os retten til at ændre disse vilkår. Ved væsentlige ændringer informerer vi dig via email.</p>

          <h2>11. Lovvalg og tvister</h2>
          <p>Disse vilkår er underlagt dansk ret. Tvister søges løst i mindelighed, og kan alternativt indbringes for de danske domstole.</p>

          <h2>12. Kontakt</h2>
          <p>FlipAcademy DK<br />Email: <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
