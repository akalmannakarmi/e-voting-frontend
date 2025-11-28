export default function FormInput({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="border p-2 rounded w-full focus:ring focus:ring-blue-200 outline-none"
      />
    </div>
  );
}
