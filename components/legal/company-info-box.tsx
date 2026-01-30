import { cn } from "@/lib/utils";

interface InfoRow {
  label: string;
  value: string;
}

interface CompanyInfoBoxProps {
  title: string;
  rows: InfoRow[];
  className?: string;
}

export function CompanyInfoBox({ title, rows, className }: CompanyInfoBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-800 bg-[#161B22] p-6",
        className
      )}
    >
      <h3 className="text-base font-semibold text-white mb-4">{title}</h3>
      <dl className="space-y-2.5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 text-sm shrink-0 sm:w-36">
              {label}
            </dt>
            <dd className="text-gray-200 text-sm">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
