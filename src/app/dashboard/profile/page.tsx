"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMessage("Profil opdateret!");
      await update({ name });
    } else {
      setMessage("Noget gik galt. Prøv igen.");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Profil</h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Dine oplysninger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Navn</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dit navn"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <Input
                value={session?.user?.email ?? ""}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-gray-500">
                Email kan ikke ændres
              </p>
            </div>

            {message && (
              <p className="text-sm text-green-400">{message}</p>
            )}

            <Button type="submit" disabled={saving}>
              {saving ? "Gemmer..." : "Gem ændringer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
