import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="FlipAcademy" className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-bold text-white">FlipAcademy</span>
            </div>
            <p className="text-sm text-gray-400">
              Lær at tjene penge på tøjflipping med Danmarks mest komplette kursus.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#kurset" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Kurset
                </Link>
              </li>
              <li>
                <Link href="/#pris" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pris
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Juridisk</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/vilkaar" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Vilkår og betingelser
                </Link>
              </li>
              <li>
                <Link href="/privatlivspolitik" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link href="/refundering" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Refunderingspolitik
                </Link>
              </li>
              <li>
                <Link href="/cookiepolitik" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookiepolitik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@flipacademy.dk" className="text-sm text-gray-400 hover:text-white transition-colors">
                  support@flipacademy.dk
                </a>
              </li>
              <li>
                <a href="https://discord.gg/flipacademy" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 space-y-2">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FlipAcademy DK. Alle rettigheder forbeholdes.
          </p>
          <p className="text-center text-xs text-gray-600">
            Kursusindholdet er AI-genereret. Discord-fællesskabet er kun tilgængeligt for betalende medlemmer.
          </p>
        </div>
      </div>
    </footer>
  );
}
