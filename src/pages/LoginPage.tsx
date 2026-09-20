import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsDemo, loginAsAdmin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(form.email, form.password);
      if (ok) {
        const isAdmin = form.email.toLowerCase().includes('admin');
        navigate(isAdmin ? '/admin/dashboard' : '/app/dashboard');
      } else {
        setError('Invalid credentials');
        setLoading(false);
      }
    }, 500);
  };

  const handleDemo = (asAdmin: boolean) => {
    if (asAdmin) {
      loginAsAdmin();
      navigate('/admin/dashboard');
    } else {
      loginAsDemo();
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-navy-950">
      {/* Left panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-950" />
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-electric-600/20 blur-[100px]" />
        <div className="relative flex h-full flex-col justify-center px-12">
          <Logo variant="dark" size="lg" />
          <h2 className="mt-12 text-3xl font-bold leading-tight text-white">
            Welcome back to<br />PayShield
          </h2>
          <p className="mt-4 max-w-md text-navy-300">
            Login to track your disputes, view transactions, and manage your account.
          </p>
          <div className="mt-10 rounded-2xl border border-navy-800 bg-navy-950/50 p-6">
            <p className="text-sm font-semibold text-electric-400">Demo Accounts</p>
            <p className="mt-2 text-xs text-navy-400">Use the demo buttons on the right to explore the platform instantly.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-navy-300">
                <User className="h-4 w-4 text-electric-400" />
                Customer: any email without "admin"
              </div>
              <div className="flex items-center gap-2 text-xs text-navy-300">
                <ShieldCheck className="h-4 w-4 text-electric-400" />
                Admin: any email containing "admin"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo variant="dark" size="md" />
          </div>
          <div className="rounded-2xl border border-navy-800 bg-navy-900/50 p-8">
            <h1 className="text-2xl font-bold text-white">Login to your account</h1>
            <p className="mt-2 text-sm text-navy-400">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="label-text text-navy-200">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field border-navy-700 bg-navy-950 pl-10 text-white placeholder-navy-500"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="label-text text-navy-200">Password</label>
                  <button type="button" className="text-xs text-electric-400 hover:text-electric-300">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field border-navy-700 bg-navy-950 pl-10 text-white placeholder-navy-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-navy-300">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="h-4 w-4 rounded border-navy-700 bg-navy-950 text-electric-600 focus:ring-electric-500"
                />
                Remember me
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? 'Logging in...' : 'Login'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-navy-800" />
              <span className="text-xs text-navy-500">Quick demo access</span>
              <div className="h-px flex-1 bg-navy-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleDemo(false)} className="btn-secondary border-navy-700 bg-navy-800 text-white hover:bg-navy-700">
                Demo Customer
              </button>
              <button onClick={() => handleDemo(true)} className="btn-secondary border-navy-700 bg-navy-800 text-white hover:bg-navy-700">
                Demo Admin
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-navy-300">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-electric-400 hover:text-electric-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
