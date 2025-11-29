export default function StepHeader({ step = 1, total = 3, title = "Step" }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 text-sm font-medium text-gray-800">
        <span>{title} {step} / {total}</span>
      </div>
      <div className="w-full bg-gray-300 h-2 rounded-full">
        <div
          className="h-2 bg-brand-600 rounded-full transition-all"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

