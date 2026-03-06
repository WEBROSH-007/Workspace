"use client";
import { memo } from "react";

const types = ["All", "Conference", "Boardroom", "Creative Studio", "Private Office", "Event Space", "Lounge"];

const RoomFilters = memo(function RoomFilters({ search, setSearch, filter, setFilter, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`whitespace-nowrap text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${
              filter === type
                ? "bg-amber-400 text-neutral-950"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
      >
        <option value="default">Sort: Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="capacity-asc">Capacity: Small → Large</option>
      </select>
    </div>
  );
});

export default RoomFilters;
