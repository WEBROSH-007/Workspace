"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { user, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLinks = [
    { href: "/dashboard", label: "Rooms" },
    { href: "/bookings", label: "My Bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="#0a0a0a" />
              <rect
                x="8"
                y="8"
                width="5"
                height="5"
                rx="1"
                fill="#0a0a0a"
                opacity="0.4"
              />
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight text-lg hidden sm:block">
            work<span className="text-amber-400">space</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-amber-400/10 text-amber-400"
                  : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-neutral-950 text-xs font-bold">
                {user.avatar}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-neutral-100 leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-neutral-800"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
