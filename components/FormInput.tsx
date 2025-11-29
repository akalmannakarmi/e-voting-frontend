export default function FormInput({ label, ...props }: any) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full rounded-md px-3 py-2
                   border border-gray-400
                   text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]
                   placeholder-gray-400"
      />
    </div>
  );
}
