const BASE = "http://localhost:8000";

export async function fetchActiveVotings() {
  const res = await fetch(`${BASE}/votings`, { cache: "no-store" });
  return res.json();
}

export async function fetchVotingChoices(votingId: string) {
  const res = await fetch(`${BASE}/vote/${votingId}/choices`, { cache: "no-store" });
  return res.json();
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
      voterId
    },
    body: JSON.stringify({ votingId, otp }),
  });
}

export async function requestCastVote(votingId: string, choice: string, token: string) {
  return fetch(`${BASE}/vote/cast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token
    },
    body: JSON.stringify({ votingId, choice }),
  });
}

