import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6">
      <div className="absolute left-1/2 top-1/3 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-electric-600/10 blur-[100px]" />
      <div className="relative text-center">
        <div className="mb-6 flex justify-center">
          <Logo variant="dark" size="lg" />
        </div>
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-electric-500/10">
            <ShieldAlert className="h-12 w-12 text-electric-400" />
          </div>
        </div>
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-navy-200">Page not found</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-navy-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/app/dashboard" className="btn-primary mt-8 px-6 py-3">
          <Home className="h-5 w-5" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
