"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { fetchVotingChoices, requestCastVote } from "@/lib/api";

export default function CastVotePage() {
  const params = useParams();
  const votingId = params?.votingId?.toString()!;

  const [choices, setChoices] = useState<any[]>([]);
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!votingId) return;
    setLoading(true);
    fetchVotingChoices(votingId)
      .then((data) => setChoices(data || []))
      .catch((err) => setError(err.message || "Failed to load choices"))
      .finally(() => setLoading(false));
  }, [votingId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!choice) return setError("Select an option");
    setBusy(true);

    try {
      const token = localStorage.getItem("voteToken") || "";
      const res = await requestCastVote(votingId!, choice, token);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Cast failed");
      }
      window.location.href = `/vote/${votingId}/success`;
    } catch (err: any) {
      setError(err?.message || "Failed to cast vote");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-md mx-auto animate-fadeUp">
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Cast Your Vote</h2>

        {loading && <div className="text-gray-600">Loading choices…</div>}
        {error && <div className="text-red-600 mb-3">{error}</div>}

        {!loading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-3">
              {choices.map((c: any) => (
                <label key={c.id} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3
                    ${choice === c.id ? 'ring-2 ring-brand-100 bg-brand-50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="choice" value={c.id} checked={choice === c.id} onChange={() => setChoice(c.id)} />
                  <div>
                    <div className="font-medium">{c.label}</div>
                    {c.subtitle && <div className="text-sm text-gray-500">{c.subtitle}</div>}
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit Vote"}</Button>
            </div>
          </form>
        )}
      </Card>
    </main>
  );
}

