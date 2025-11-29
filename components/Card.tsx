export default function Card({ children, className = "" }: any) {
  return (
    <div className={`bg-white rounded-xl border border-gray-300 shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
