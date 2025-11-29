"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StepHeader from "@/components/StepHeader";
import { requestStartVote } from "@/lib/api";

export default function VoterIdForm({ votingId }: { votingId: string }) {
  const [voterId, setVoterId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!voterId) return setError("Enter your voter ID");
    setBusy(true);

    try {
      const res = await requestStartVote(votingId, voterId);
      if (!res.ok) throw new Error("Failed to send OTP");
      // redirect to OTP page with voterId in query (transient)
      window.location.href = `/vote/${votingId}/otp?voterId=${encodeURIComponent(voterId)}`;
    } catch (err: any) {
      setError(err?.message || "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-md mx-auto animate-fadeUp">
      <Card>
        <StepHeader step={1} total={3} />

        <h2 className="text-2xl font-semibold mb-2">Enter Voter ID</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your registered voter ID to receive a one-time passcode.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput label="Voter ID" value={voterId} onChange={(e: any) => setVoterId(e.target.value)} placeholder="e.g., VTR-12345" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-end">
            <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Send OTP"}</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}

