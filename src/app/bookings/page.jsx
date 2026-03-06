"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import BookingCard from "@/components/bookings/BookingCard";
import Navbar from "@/components/layout/Navbar";
import { EmptyState, Button } from "@/components/ui";

export default function BookingsPage() {
  const { user, bookings } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  const upcoming = bookings.filter((b) => new Date(b.endDate) >= new Date());
  const past = bookings.filter((b) => new Date(b.endDate) < new Date());

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              Your account
            </p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              My Bookings
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              {bookings.length} total · {upcoming.length} upcoming
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              + New Booking
            </Button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No bookings yet"
            description="Head over to the rooms page to book your first workspace."
            action={
              <Link href="/dashboard">
                <Button>Browse Rooms</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Upcoming
                  </h2>
                  <div className="flex-1 h-px bg-neutral-800" />
                  <span className="text-xs text-neutral-600">
                    {upcoming.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {upcoming.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Past
                  </h2>
                  <div className="flex-1 h-px bg-neutral-800" />
                  <span className="text-xs text-neutral-600">
                    {past.length}
                  </span>
                </div>
                <div className="space-y-3 opacity-70">
                  {past.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
