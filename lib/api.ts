const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function handleRes(res: Response) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function fetchActiveVotings() {
  const res = await fetch(`${BASE}/votings`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load votings (${res.status})`);
  return handleRes(res);
}

export async function fetchVotingChoices(votingId: string) {
  const res = await fetch(`${BASE}/vote/${votingId}/choices`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load choices (${res.status})`);
  return handleRes(res);
}

export async function requestStartVote(votingId: string, voterId: string) {
  return fetch(`${BASE}/vote/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votingId, voterId }),
  });
}

export async function requestVerifyOtp(votingId: string, otp: string, voterId: string) {
  return fetch(`${BASE}/vote/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      voterid: voterId, // backend expects header 'voterid' (see your FastAPI)
    },
    body: JSON.stringify({ votingId, otp }),
  });
}

export async function requestCastVote(votingId: string, choice: string, token: string) {
  return fetch(`${BASE}/vote/cast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ votingId, choice }),
  });
}

