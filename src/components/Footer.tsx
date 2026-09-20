import { Link } from 'react-router-dom';
import { ShieldCheck, Twitter, Linkedin, Github } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="dark" size="lg" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-400">
              PayShield is a digital payment dispute and resolution platform that helps customers raise, track, and resolve payment disputes with confidence and transparency.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-navy-300 transition-colors hover:bg-electric-600 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-navy-300 transition-colors hover:bg-electric-600 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-navy-300 transition-colors hover:bg-electric-600 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 md:flex-row">
          <p className="text-xs text-navy-400">© 2026 PayShield. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-navy-400">
            <ShieldCheck className="h-4 w-4 text-electric-500" />
            <span>Secured with bank-grade encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
