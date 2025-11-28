"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { requestStartVote } from "@/lib/api";
import Card from "@/components/Card";

export default function VoterIdForm({ votingId }: { votingId: string }) {
  const [voterId, setVoterId] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await requestStartVote(votingId, voterId);
    window.location.href = `/vote/${votingId}/otp?voterId=${voterId}`;
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Enter Voter ID</h1>
        <form onSubmit={submit} className="space-y-4">
          <FormInput
            label="Voter ID"
            value={voterId}
            onChange={e => setVoterId(e.target.value)}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Card>
    </main>
  );
}

