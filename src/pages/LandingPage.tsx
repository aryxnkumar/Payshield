import { Link } from 'react-router-dom';
import {
  ArrowRight, FileText, Search, CheckCircle2, Shield, Lock, Zap,
  TrendingUp, Users, Clock, AlertTriangle, Eye, FileCheck,
  Smartphone, Globe, Headphones,
} from 'lucide-react';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Footer } from '@/components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <PublicNavbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Security />
      <WhyPayShield />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-electric-600/20 blur-[120px]" />
      <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-electric-500/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-300 animate-fade-in">
            <Shield className="h-4 w-4" />
            Trusted Payment Dispute Resolution
          </div>
          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl animate-fade-in-up">
            A safer way to handle
            <span className="block bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent">
              payment disputes.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-300 animate-fade-in-up">
            Raise, track, and resolve payment disputes with full transparency. PayShield gives you control over every transaction issue — from failed payments to unauthorized charges.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
            <Link to="/signup" className="btn-primary px-7 py-3.5 text-base">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy-700 bg-navy-800/50 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-navy-800 hover:border-navy-600">
              Track a Dispute
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-navy-800 pt-8">
            <div>
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="mt-1 text-sm text-navy-400">Disputes Resolved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="mt-1 text-sm text-navy-400">Resolution Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="mt-1 text-sm text-navy-400">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Report',
      description: 'Select a transaction and raise a dispute with details and evidence in minutes.',
      color: 'from-electric-500 to-electric-700',
    },
    {
      icon: Search,
      title: 'Review',
      description: 'Our team reviews your dispute, verifies the evidence, and keeps you updated at every stage.',
      color: 'from-electric-600 to-electric-800',
    },
    {
      icon: CheckCircle2,
      title: 'Resolve',
      description: 'Get your dispute resolved with a clear outcome — refund, rejection, or further action.',
      color: 'from-electric-700 to-electric-900',
    },
  ];

  return (
    <section id="how-it-works" className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-electric-400">How It Works</p>
          <h2 className="mt-2 text-4xl font-bold text-white">Three simple steps to resolution</h2>
          <p className="mt-4 text-navy-300">PayShield makes the dispute process straightforward and transparent.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="group relative rounded-2xl border border-navy-800 bg-navy-900/50 p-8 transition-all hover:border-electric-500/50 hover:bg-navy-900">
              <div className="absolute right-6 top-6 text-6xl font-bold text-navy-800 transition-colors group-hover:text-electric-900">
                0{i + 1}
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: FileText, title: 'Multi-Step Dispute Filing', description: 'A guided, step-by-step process to file disputes with transaction details, category, description, and evidence.' },
    { icon: Eye, title: 'Real-Time Tracking', description: 'Track your dispute status through every stage — from Raised to Resolved — with a visual timeline.' },
    { icon: FileCheck, title: 'Evidence Management', description: 'Upload and manage proof documents like screenshots, bank statements, and receipts with ease.' },
    { icon: TrendingUp, title: 'Transaction Insights', description: 'View your full transaction history with filters for status, payment type, and date ranges.' },
    { icon: AlertTriangle, title: 'Priority Classification', description: 'Disputes are categorized by priority — Low, Medium, High, Critical — for faster resolution of urgent issues.' },
    { icon: Smartphone, title: 'Mobile Responsive', description: 'Access PayShield from any device — desktop, tablet, or mobile — with a fully responsive interface.' },
  ];

  return (
    <section id="features" className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-electric-400">Features</p>
          <h2 className="mt-2 text-4xl font-bold text-white">Everything you need to manage disputes</h2>
          <p className="mt-4 text-navy-300">Powerful tools to raise, track, and resolve payment disputes efficiently.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-navy-800 bg-navy-950/50 p-6 transition-all hover:border-electric-500/40 hover:shadow-lg hover:shadow-electric-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10">
                <f.icon className="h-6 w-6 text-electric-400" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section id="security" className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric-400">Security</p>
            <h2 className="mt-2 text-4xl font-bold text-white">Bank-grade security at every step</h2>
            <p className="mt-4 text-navy-300">
              Your data and transactions are protected with industry-standard encryption and security protocols. We take your privacy and financial safety seriously.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { icon: Lock, title: 'End-to-End Encryption', desc: 'All dispute data is encrypted in transit and at rest.' },
                { icon: Shield, title: 'Secure Evidence Handling', desc: 'Your uploaded documents are stored with strict access controls.' },
                { icon: Zap, title: 'Fraud Detection', desc: 'Advanced algorithms flag suspicious transactions automatically.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-electric-500/10">
                    <item.icon className="h-5 w-5 text-electric-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-navy-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-500/20 to-electric-700/10 blur-2xl" />
            <div className="relative rounded-3xl border border-navy-800 bg-navy-900/50 p-8">
              <div className="flex items-center gap-3 border-b border-navy-800 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-electric-700 shadow-lg shadow-electric-500/30">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Security Dashboard</p>
                  <p className="text-sm text-navy-400">Your account is protected</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Encryption', value: 'AES-256', color: 'bg-green-500' },
                  { label: 'Compliance', value: 'PCI DSS', color: 'bg-electric-500' },
                  { label: 'Audit Logs', value: 'Enabled', color: 'bg-green-500' },
                  { label: '2FA Support', value: 'Available', color: 'bg-electric-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-navy-950/50 px-5 py-4">
                    <span className="text-sm text-navy-300">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPayShield() {
  const reasons = [
    { icon: Clock, title: 'Faster Resolutions', desc: 'Average resolution time of 3-5 business days compared to weeks with traditional channels.' },
    { icon: Users, title: 'Dedicated Support', desc: 'A team of dispute resolution specialists available 24/7 to assist you.' },
    { icon: Globe, title: 'All Payment Types', desc: 'Support for UPI, Debit Cards, Credit Cards, and Net Banking disputes.' },
    { icon: Headphones, title: 'Transparent Process', desc: 'Full visibility into your dispute status with real-time timeline updates.' },
  ];

  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-electric-400">Why PayShield</p>
          <h2 className="mt-2 text-4xl font-bold text-white">The smarter way to resolve disputes</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div key={i} className="rounded-2xl border border-navy-800 bg-navy-950/50 p-6 text-center transition-all hover:border-electric-500/40">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-electric-500/10">
                <r.icon className="h-7 w-7 text-electric-400" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-navy-950 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-electric-500/30 bg-gradient-to-br from-navy-900 to-navy-950 p-12 text-center">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-electric-500/20 blur-[80px]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to take control of your payment disputes?</h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-300">Join thousands of customers who trust PayShield to resolve their payment issues quickly and fairly.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup" className="btn-primary px-7 py-3.5 text-base">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy-700 bg-navy-800/50 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-navy-800">
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
