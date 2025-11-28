export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border p-6 rounded-lg shadow-sm bg-white">
      {children}
    </div>
  );
}
