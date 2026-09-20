import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Security', href: '/#security' },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHashNav = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? 'bg-navy-950/95 backdrop-blur-md shadow-lg shadow-navy-950/30' : 'bg-transparent'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo variant="dark" />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleHashNav(link.href)}
              className="text-sm font-medium text-navy-200 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <Link to="/login" className="text-sm font-medium text-navy-200 transition-colors hover:text-white">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="border-t border-navy-800 bg-navy-950 px-6 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleHashNav(link.href)}
                className="text-left text-sm font-medium text-navy-200 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <Link to="/login" className="text-sm font-medium text-navy-200 hover:text-white" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="btn-primary" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
