"use client";
import { memo } from "react";
import { Badge } from "@/components/ui";

const BookingCard = memo(function BookingCard({ booking }) {
  const nights = Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / 86400000);
  const isPast = new Date(booking.endDate) < new Date();

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex gap-0 hover:border-neutral-700 transition-all">
      {/* Image strip */}
      <div className="w-24 sm:w-32 shrink-0 relative">
        {booking.roomImage ? (
          <img src={booking.roomImage} alt={booking.roomName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/40" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-neutral-100 text-sm sm:text-base">{booking.roomName}</h3>
            <Badge variant={isPast ? "default" : "success"}>
              {isPast ? "Completed" : "Upcoming"}
            </Badge>
          </div>
          {booking.roomType && (
            <p className="text-xs text-neutral-500 mt-0.5">{booking.roomType}</p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-neutral-500">
            <span>
              📅 {new Date(booking.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              {" – "}
              {new Date(booking.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span>⏱ {nights} day{nights > 1 ? "s" : ""}</span>
          </div>

          <p className="text-[10px] font-mono text-neutral-600 mt-1">ID: {booking.id}</p>
        </div>

        <div className="text-right sm:shrink-0">
          <p className="text-amber-400 font-bold text-lg">${booking.price}</p>
          <p className="text-neutral-600 text-xs">total</p>
        </div>
      </div>
    </div>
  );
});

export default BookingCard;
