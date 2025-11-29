"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import Card from "@/components/Card";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import StepHeader from "@/components/StepHeader";
import { requestVerifyOtp } from "@/lib/api";

export default function OtpPage() {
  const params = useParams();
  const search = useSearchParams();
  const votingId = params?.votingId?.toString()!;
  const voterId = search.get("voterId") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!otp) return setError("Enter the OTP");

    setBusy(true);
    try {
      const res = await requestVerifyOtp(votingId, otp, voterId);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Invalid OTP");
      if (data.token) {
        localStorage.setItem("voteToken", data.token);
        window.location.href = `/vote/${votingId}/cast`;
      } else {
        throw new Error("No token received");
      }
    } catch (err: any) {
      setError(err?.message || "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-md mx-auto animate-fadeUp">
      <Card>
        <StepHeader step={2} total={3} />
        <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-6">We sent a one-time passcode to the contact on file for <strong>{voterId}</strong>.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput label="OTP" value={otp} onChange={(e: any) => setOtp(e.target.value)} placeholder="Enter 6-digit code" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Can't find the code?</div>
            <Button type="submit" disabled={busy}>{busy ? "Verifying..." : "Verify"}</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}

