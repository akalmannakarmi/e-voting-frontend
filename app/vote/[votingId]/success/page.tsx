"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";

export default function SuccessPage() {
  function goHome() {
    window.location.href = "/";
  }

  return (
    <main className="p-10 max-w-md mx-auto">
      <Card>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          🎉 Vote Submitted!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for participating in the voting.
        </p>

        <div className="flex justify-center">
          <Button onClick={goHome}>Go to Home</Button>
        </div>
      </Card>
    </main>
  );
}

