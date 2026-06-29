import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = { title: "Privatlivspolitik" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Privatlivspolitik</h1>
          <p className="text-gray-400">Sidst opdateret: Juni 2026</p>

          <h2>1. Dataansvarlig</h2>
          <p>FlipAcademy DK er dataansvarlig for behandlingen af de personoplysninger, som vi modtager om dig. Du kan kontakte os på <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a>.</p>

          <h2>2. Hvilke oplysninger indsamler vi?</h2>
          <p>Vi indsamler følgende personoplysninger:</p>
          <ul>
            <li><strong>Kontooplysninger:</strong> Navn, email, adgangskode (krypteret)</li>
            <li><strong>Betalingsoplysninger:</strong> Behandles af Stripe — vi gemmer ikke kortoplysninger</li>
            <li><strong>Discord:</strong> Discord brugernavn og ID (hvis du forbinder din konto)</li>
            <li><strong>Brugsdata:</strong> Kursusfremskridt, login-tidspunkter</li>
            <li><strong>Tekniske data:</strong> IP-adresse, browsertype (via cookies)</li>
          </ul>

          <h2>3. Formål med behandlingen</h2>
          <p>Vi bruger dine data til at:</p>
          <ul>
            <li>Oprette og administrere din konto</li>
            <li>Give dig adgang til kurser du har købt</li>
            <li>Behandle betalinger via Stripe</li>
            <li>Sende ordrebekræftelse og vigtige meddelelser</li>
            <li>Forbinde din Discord-konto til fællesskabet</li>
            <li>Forbedre vores platform</li>
          </ul>

          <h2>4. Retsgrundlag</h2>
          <ul>
            <li><strong>Kontraktopfyldelse:</strong> Behandling nødvendig for at levere kurset du har købt (GDPR art. 6(1)(b))</li>
            <li><strong>Samtykke:</strong> Valgfrie cookies og marketing (GDPR art. 6(1)(a))</li>
            <li><strong>Legitim interesse:</strong> Forbedring af platformen og sikkerhed (GDPR art. 6(1)(f))</li>
          </ul>

          <h2>5. Tredjeparter</h2>
          <p>Vi deler data med følgende tredjeparter, som alle overholder GDPR:</p>
          <ul>
            <li><strong>Stripe</strong> — Betalingsbehandling (USA, EU Standard Contractual Clauses)</li>
            <li><strong>Resend</strong> — Email-afsendelse</li>
            <li><strong>Discord</strong> — Fællesskab (kun hvis du selv forbinder)</li>
            <li><strong>Vercel</strong> — Hosting af hjemmesiden</li>
          </ul>

          <h2>6. Opbevaring</h2>
          <p>Vi opbevarer dine data så længe du har en aktiv konto. Betalingsdata opbevares i 5 år jf. bogføringsloven. Du kan til enhver tid anmode om sletning af din konto.</p>

          <h2>7. Dine rettigheder</h2>
          <p>Du har ret til at:</p>
          <ul>
            <li>Få indsigt i dine personoplysninger</li>
            <li>Få rettet urigtige oplysninger</li>
            <li>Få slettet dine oplysninger</li>
            <li>Gøre indsigelse mod behandling</li>
            <li>Trække dit samtykke tilbage</li>
            <li>Klage til Datatilsynet (datatilsynet.dk)</li>
          </ul>
          <p>Kontakt os på <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a> for at udøve dine rettigheder.</p>

          <h2>8. Sikkerhed</h2>
          <p>Vi bruger kryptering (HTTPS/TLS), hashing af adgangskoder (bcrypt), og sikker betalingsbehandling via Stripe for at beskytte dine data.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
