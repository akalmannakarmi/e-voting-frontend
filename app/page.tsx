import { fetchActiveVotings } from "@/lib/api";
import Card from "@/components/Card";

export default async function HomePage() {
  const votings = await fetchActiveVotings();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Active Votings</h1>
      <div className="grid gap-4">
        {votings.map((v: any) => (
          <a key={v.id} href={`/vote/${v.id}`}>
            <Card>
              <div className="font-medium text-lg">{v.title}</div>
              <div className="text-gray-600 text-sm mt-1">{v.description}</div>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}

