"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { roomService } from "@/services/api";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";
import Navbar from "@/components/layout/Navbar";
import { Spinner, EmptyState, Alert } from "@/components/ui";

export default function DashboardPage() {
  const { user } = useApp();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    roomService
      .getRooms()
      .then(setRooms)
      .catch(() => setError("Failed to load rooms. Please refresh the page."))
      .finally(() => setLoading(false));
  }, [user, router]);

  const filtered = useMemo(() => {
    let list = rooms;
    if (search)
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.type.toLowerCase().includes(search.toLowerCase()) ||
          r.amenities.some((a) =>
            a.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    if (filter !== "All") list = list.filter((r) => r.type === filter);
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "capacity-asc")
      list = [...list].sort((a, b) => a.capacity - b.capacity);
    return list;
  }, [rooms, search, filter, sort]);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 17
                ? "afternoon"
                : "evening"}
            , {user?.name?.split(" ")[0]}
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Find Your Space
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {rooms.length} rooms available · Book instantly
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <RoomFilters
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" />
              <p className="text-neutral-500 text-sm">
                Loading available rooms...
              </p>
            </div>
          </div>
        )}

        {!loading && error && <Alert type="error" message={error} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No rooms found"
            description="Try adjusting your search or filters to find available spaces."
            action={
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="text-sm text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Clear filters
              </button>
            }
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-xs text-neutral-600 mb-4">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
