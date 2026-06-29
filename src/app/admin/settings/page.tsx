import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Admin - Indstillinger" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Indstillinger</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stripe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-400">
              Administrer dine betalingsindstillinger i Stripe Dashboard
            </p>
            <Button variant="secondary" asChild>
              <a
                href="https://dashboard.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Stripe Dashboard
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discord Bot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-400">
              Administrer din Discord bot og serverindstillinger
            </p>
            <Button variant="secondary" asChild>
              <a
                href="https://discord.com/developers/applications"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Discord Developer Portal
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email (Resend)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-400">
              Administrer dine email-indstillinger og domæne
            </p>
            <Button variant="secondary" asChild>
              <a
                href="https://resend.com/overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Resend Dashboard
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vercel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-400">
              Deployment, domæne og miljøvariabler
            </p>
            <Button variant="secondary" asChild>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Vercel Dashboard
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
