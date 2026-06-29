import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = { title: "Cookiepolitik" };

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Cookiepolitik</h1>
          <p className="text-gray-400">Sidst opdateret: Juni 2026</p>

          <h2>1. Hvad er cookies?</h2>
          <p>Cookies er små tekstfiler der gemmes på din enhed når du besøger en hjemmeside. De bruges til at huske dine præferencer og forbedre din oplevelse.</p>

          <h2>2. Cookies vi bruger</h2>

          <h3>Nødvendige cookies (altid aktive)</h3>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Formål</th><th>Varighed</th></tr>
            </thead>
            <tbody>
              <tr><td>next-auth.session-token</td><td>Login og autentificering</td><td>30 dage</td></tr>
              <tr><td>next-auth.csrf-token</td><td>Sikkerhed mod CSRF-angreb</td><td>Session</td></tr>
              <tr><td>flipacademy-cookie-consent</td><td>Gemmer dit cookie-valg</td><td>365 dage</td></tr>
            </tbody>
          </table>

          <h3>Analytiske cookies (valgfrie)</h3>
          <p>Bruges til at forstå hvordan besøgende interagerer med hjemmesiden. Data er anonymiseret.</p>

          <h3>Marketing cookies (valgfrie)</h3>
          <p>Bruges til at vise relevante annoncer. Disse cookies deles med tredjeparter som Meta og Google.</p>

          <h2>3. Tredjepartscookies</h2>
          <ul>
            <li><strong>Stripe</strong> — Sætter cookies i forbindelse med betalingsprocessen for sikkerhed og svindelforebyggelse</li>
            <li><strong>Discord</strong> — Sætter cookies når du forbinder din Discord-konto</li>
          </ul>

          <h2>4. Administrer dine cookies</h2>
          <p>Du kan til enhver tid ændre dine cookie-præferencer via cookie-banneret nederst på siden, eller ved at slette cookies i din browsers indstillinger.</p>

          <h3>Slet cookies i din browser:</h3>
          <ul>
            <li><strong>Chrome:</strong> Indstillinger → Beskyttelse af personlige oplysninger → Cookies</li>
            <li><strong>Firefox:</strong> Indstillinger → Privatliv og sikkerhed → Cookies</li>
            <li><strong>Safari:</strong> Indstillinger → Privatliv → Administrer websitedata</li>
            <li><strong>Edge:</strong> Indstillinger → Cookies og webstedstilladelser</li>
          </ul>

          <h2>5. Kontakt</h2>
          <p>Har du spørgsmål til vores brug af cookies, kontakt os på <a href="mailto:support@flipacademy.dk">support@flipacademy.dk</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
