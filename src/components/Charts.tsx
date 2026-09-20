interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-between gap-3" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: d.color || 'linear-gradient(to top, #2563eb, #3b82f6)',
                minHeight: '4px',
              }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-center text-xs font-medium text-gray-500">{d.label}</span>
          <span className="text-sm font-bold text-navy-900">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export function DonutChart({ data, size = 180 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="16" />
          {data.map((d, i) => {
            const length = (d.value / total) * circumference;
            const circle = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="16"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );
            offset += length;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-navy-900">{total}</span>
          <span className="text-xs text-gray-500">Total</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ background: d.color }} />
            <span className="text-sm text-gray-600">{d.label}</span>
            <span className="text-sm font-semibold text-navy-900">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
