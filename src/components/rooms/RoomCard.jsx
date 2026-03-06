"use client";
import { useState, memo } from "react";
import { Badge } from "@/components/ui";
import BookingModal from "./BookingModal";

const RoomCard = memo(function RoomCard({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 flex flex-col"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-neutral-800">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="success">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Available
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="default">{room.type}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="font-bold text-neutral-100 text-base leading-tight group-hover:text-amber-400 transition-colors">
              {room.name}
            </h3>
            <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{room.description}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm5 5a5 5 0 00-10 0h10z" />
              </svg>
              {room.capacity} people
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.5 4v3.25l2.5 2.5-.75.75-2.75-2.75V5h1z" />
              </svg>
              Floor {room.floor}
            </span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-[10px] font-medium px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-md">
                {a}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[10px] font-medium px-2 py-0.5 bg-neutral-800 text-neutral-500 rounded-md">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-800">
            <div>
              <span className="text-amber-400 font-bold text-lg">${room.price}</span>
              <span className="text-neutral-500 text-xs"> / day</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300 group-hover:text-amber-400 transition-colors">
              Book now →
            </span>
          </div>
        </div>
      </div>

      {open && <BookingModal room={room} onClose={() => setOpen(false)} />}
    </>
  );
});

export default RoomCard;
