import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ variant = 'dark', size = 'md' }: { variant?: 'dark' | 'light'; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 'h-7 w-7', text: 'text-lg' },
    md: { icon: 'h-9 w-9', text: 'text-xl' },
    lg: { icon: 'h-11 w-11', text: 'text-2xl' },
  };
  const s = sizes[size];
  const textColor = variant === 'dark' ? 'text-white' : 'text-navy-900';

  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className={`flex ${s.icon} items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700 shadow-lg shadow-electric-500/30`}>
        <ShieldCheck className="h-2/3 w-2/3 text-white" />
      </div>
      <span className={`font-bold ${s.text} ${textColor} tracking-tight`}>
        Pay<span className="text-electric-500">Shield</span>
      </span>
    </Link>
  );
}
