"use client";

import { useParams } from "next/navigation";
import VoterIdForm from "./VoterIdForm";

export default function Page() {
  const params = useParams();
  const votingId = params?.votingId;

  // Validate presence
  if (!votingId || typeof votingId !== "string") {
    return <div className="p-8 text-red-600">Invalid voting</div>;
  }

  // Render the form
  return <VoterIdForm votingId={votingId} />;
}

