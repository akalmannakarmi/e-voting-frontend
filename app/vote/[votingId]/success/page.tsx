"use client";
import Link from "next/link";
import Card from "@/components/Card";

export default function SuccessPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center text-4xl text-green-700">
          ✓
        </div>

        <h3 className="text-2xl font-bold mb-2">Vote Submitted</h3>
        <p className="text-gray-600 mb-6">Your vote has been recorded securely. Thank you for participating.</p>

        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Back to Home</Link>
          <Link href="/" className="inline-flex items-center px-5 py-2 rounded-lg border border-gray-200 text-gray-700">View other votings</Link>
        </div>
      </Card>
    </main>
  );
}

