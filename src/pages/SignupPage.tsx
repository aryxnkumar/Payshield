import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      signup(form.name, form.email, form.password);
      navigate('/app/dashboard');
    }, 600);
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
            Start resolving your<br />payment disputes today
          </h2>
          <p className="mt-4 max-w-md text-navy-300">
            Create your PayShield account and gain access to a powerful dispute resolution platform.
          </p>
          <div className="mt-10 space-y-4">
            {['Raise disputes in minutes', 'Track status in real-time', 'Bank-grade security'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-electric-400" />
                <span className="text-navy-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo variant="dark" size="md" />
          </div>
          <div className="rounded-2xl border border-navy-800 bg-navy-900/50 p-8">
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="mt-2 text-sm text-navy-400">Get started with PayShield in seconds</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="label-text text-navy-200">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field border-navy-700 bg-navy-950 pl-10 text-white placeholder-navy-500"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

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
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className="label-text text-navy-200">Password</label>
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
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>

              <div>
                <label className="label-text text-navy-200">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className="input-field border-navy-700 bg-navy-950 pl-10 text-white placeholder-navy-500"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-400">{errors.confirm}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-navy-800" />
              <span className="text-xs text-navy-500">or</span>
              <div className="h-px flex-1 bg-navy-800" />
            </div>

            <Link to="/login" className="block text-center text-sm text-navy-300 hover:text-white">
              Already have an account? <span className="font-semibold text-electric-400">Login</span>
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-navy-500">
            <ShieldCheck className="h-4 w-4" />
            Your data is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
}
