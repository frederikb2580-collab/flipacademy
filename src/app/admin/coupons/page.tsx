"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Trash2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  active: boolean;
  _count: { orders: number };
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/coupons")
      .then((r) => r.json())
      .then(setCoupons);
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        type,
        value: parseInt(value),
        maxUses: maxUses ? parseInt(maxUses) : undefined,
        expiresAt: expiresAt || undefined,
      }),
    });

    if (res.ok) {
      const coupon = await res.json();
      setCoupons((prev) => [{ ...coupon, _count: { orders: 0 } }, ...prev]);
      setShowForm(false);
      setCode("");
      setValue("");
      setMaxUses("");
      setExpiresAt("");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Rabatkoder</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Ny rabatkode
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Opret rabatkode</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Kode</label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="FLIP20" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "PERCENTAGE" | "FIXED")}
                  className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  <option value="PERCENTAGE">Procent</option>
                  <option value="FIXED">Fast beløb (DKK)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">
                  Værdi {type === "PERCENTAGE" ? "(%)" : "(DKK)"}
                </label>
                <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} min={1} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Max brug (valgfrit)</label>
                <Input type="number" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} min={1} />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Udløbsdato (valgfrit)</label>
                <Input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={saving} className="w-full">
                  {saving ? "Opretter..." : "Opret"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Kode</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Værdi</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Brugt</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-white/5">
                    <td className="px-6 py-4 text-sm font-mono text-white">{coupon.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {coupon.type === "PERCENTAGE" ? "Procent" : "Fast beløb"}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : `${coupon.value} DKK`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {coupon.usedCount}{coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={coupon.active ? "success" : "destructive"}>
                        {coupon.active ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
