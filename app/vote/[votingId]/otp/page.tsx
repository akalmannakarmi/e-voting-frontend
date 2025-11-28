"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { requestVerifyOtp } from "@/lib/api";
import Card from "@/components/Card";

export default function OtpPage() {
  const search = useSearchParams();
  const params = useParams();

  // Correct param name
  const votingId = params?.votingId?.toString()!;
  const voterId = search.get("voterId")!;
  const [otp, setOtp] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await requestVerifyOtp(votingId, otp, voterId);
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("voteToken", data.token);
      window.location.href = `/vote/${votingId}/cast`;
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Verify OTP</h1>
        <form onSubmit={submit} className="space-y-4">
          <FormInput
            label="OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <Button type="submit">Verify</Button>
        </form>
      </Card>
    </main>
  );
}

