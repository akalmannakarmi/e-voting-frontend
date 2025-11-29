import { fetchActiveVotings } from "@/lib/api";
import Card from "@/components/Card";
import Link from "next/link";

export default async function HomePage() {
  let votings = [];
  try {
    votings = await fetchActiveVotings();
  } catch (err) {
    // show fallback
    votings = [];
  }

  return (
    <div className="space-y-6">
      <header className="mb-4">
        <h1 className="text-3xl font-semibold">Active Votings</h1>
        <p className="text-gray-600 mt-1">Select a voting to participate. Demo backend required.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {votings.map((v: any) => (
          <Link key={v.id} href={`/vote/${v.id}`}>
            <Card className="hover:shadow-md transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-800">{v.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{v.description}</div>
                </div>
                <div className="text-xs text-gray-400">{/* maybe ends */}</div>
              </div>
            </Card>
          </Link>
        ))}

        {votings.length === 0 && (
          <Card>
            <div className="text-gray-600">No active votings — make sure the backend is running at <code className="bg-gray-100 px-1 rounded">http://localhost:8000</code></div>
          </Card>
        )}
      </div>
    </div>
  );
}

