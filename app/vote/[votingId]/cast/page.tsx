"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchVotingChoices, requestCastVote } from "@/lib/api";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function CastVotePage() {
  const params = useParams();
  const votingId = params?.votingId?.toString()!;

  const [choices, setChoices] = useState<any[]>([]);
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!votingId) return;

    fetchVotingChoices(votingId)
      .then((data) => setChoices(data))
      .finally(() => setLoading(false));
  }, [votingId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("voteToken")!;
    await requestCastVote(votingId, choice, token);
    window.location.href = `/vote/${votingId}/success`;
  }

  if (!votingId) {
    return (
      <main className="p-8 max-w-md mx-auto">
        <div className="text-red-600">Invalid voting ID</div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="p-8 max-w-md mx-auto">
        <div className="text-gray-600">Loading choices…</div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Cast Your Vote</h1>

        <form onSubmit={submit} className="space-y-4">
          {choices.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="choice"
                value={c.id}
                onChange={() => setChoice(c.id)}
                required
              />
              {c.label}
            </label>
          ))}

          <Button type="submit">Submit Vote</Button>
        </form>
      </Card>
    </main>
  );
}

