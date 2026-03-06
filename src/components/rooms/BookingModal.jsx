"use client";
import { useState, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { roomService } from "@/services/api";
import { Button, Input, Alert, Badge } from "@/components/ui";

const steps = ["Select Dates", "Confirm", "Done"];

export default function BookingModal({ room, onClose }) {
  const { user, addBooking } = useApp();
  const [step, setStep] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [booking, setBooking] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const nights =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000),
        )
      : 0;

  const validate = useCallback(() => {
    const e = {};
    if (!startDate) e.startDate = "Start date is required.";
    if (!endDate) e.endDate = "End date is required.";
    if (startDate && endDate && endDate <= startDate)
      e.endDate = "End date must be after start date.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [startDate, endDate]);

  const handleCheckAvailability = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const result = await roomService.checkAvailability(
        room.id,
        startDate,
        endDate,
      );
      if (!result.available) {
        setApiError(
          "This room is not available for the selected dates. Please choose different dates.",
        );
        return;
      }
      setStep(1);
    } catch {
      setApiError("Unable to check availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setApiError("");
    try {
      const result = await roomService.bookRoom(
        room.id,
        user?.email,
        startDate,
        endDate,
        room.name,
        room.price * nights,
      );
      setBooking(result);
      addBooking({ ...result, roomImage: room.image, roomType: room.type });
      setStep(2);
    } catch (err) {
      setApiError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-neutral-950 border-0 sm:border border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                {steps[step]}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {room.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="default">{room.type}</Badge>
                <span className="text-neutral-500 text-[10px] sm:text-xs">
                  Floor {room.floor} · Up to {room.capacity} people
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto">
            {steps.map((s, i) => (
              <div
                key={s}
                className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-amber-400 text-neutral-950"
                      : i === step
                        ? "bg-amber-400/20 border border-amber-400 text-amber-400"
                        : "bg-neutral-800 text-neutral-600"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[10px] sm:text-xs hidden sm:block whitespace-nowrap ${i === step ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px w-4 sm:w-8 ${i < step ? "bg-amber-400" : "bg-neutral-800"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] sm:max-h-none overflow-y-auto overflow-x-visible">
          {apiError && (
            <div className="mb-4">
              <Alert type="error" message={apiError} />
            </div>
          )}

          {/* Step 0 – Date Selection */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 w-full">
                <Input
                  label="Check-in"
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setErrors((p) => ({ ...p, startDate: "" }));
                  }}
                  error={errors.startDate}
                  className="min-w-0"
                />
                <Input
                  label="Check-out"
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setErrors((p) => ({ ...p, endDate: "" }));
                  }}
                  error={errors.endDate}
                  className="min-w-0"
                />
              </div>

              {nights > 0 && (
                <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-3 sm:px-4 py-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 xs:gap-0">
                  <span className="text-xs sm:text-sm text-neutral-300">
                    {nights} day{nights > 1 ? "s" : ""}
                  </span>
                  <span className="font-bold text-amber-400 text-sm sm:text-base">
                    ${room.price * nights} total
                  </span>
                </div>
              )}

              <Button
                onClick={handleCheckAvailability}
                loading={loading}
                className="w-full"
                size="lg"
              >
                Check Availability
              </Button>
            </div>
          )}

          {/* Step 1 – Confirm */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-sm sm:text-base">
                  ✓
                </span>
                <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                  Room is available for your dates!
                </span>
              </div>

              <div className="bg-neutral-900 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Booking Summary
                </p>
                {[
                  ["Room", room.name],
                  [
                    "Check-in",
                    new Date(startDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                  ],
                  [
                    "Check-out",
                    new Date(endDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                  ],
                  ["Duration", `${nights} day${nights > 1 ? "s" : ""}`],
                  ["Price/day", `$${room.price}`],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between items-start gap-2 text-xs sm:text-sm"
                  >
                    <span className="text-neutral-500 flex-shrink-0">{k}</span>
                    <span className="text-neutral-200 font-medium text-right break-words">
                      {v}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-neutral-800">
                  <span className="text-neutral-300 font-semibold text-sm sm:text-base">
                    Total
                  </span>
                  <span className="text-amber-400 font-bold text-base sm:text-lg">
                    ${room.price * nights}
                  </span>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setStep(0)}
                  className="flex-1 w-full"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  loading={loading}
                  className="flex-1 w-full"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 – Done */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-4 sm:gap-5 text-center py-2 sm:py-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M6 16l8 8 12-12"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Booking Confirmed!
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  Your room has been reserved successfully.
                </p>
              </div>
              {booking && (
                <div className="bg-neutral-900 rounded-xl px-3 sm:px-4 py-3 w-full text-left">
                  <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                    Confirmation ID
                  </p>
                  <p className="text-amber-400 font-mono text-xs sm:text-sm font-bold break-all">
                    {booking.id}
                  </p>
                </div>
              )}
              <Button onClick={onClose} className="w-full" size="lg">
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
