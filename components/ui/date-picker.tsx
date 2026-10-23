"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj",
  "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac",
];
const WEEKDAYS = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function parseISO(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) };
}

function formatDisplay(value: string) {
  const parsed = parseISO(value);
  return parsed ? `${pad(parsed.day)}.${pad(parsed.month + 1)}.${parsed.year}.` : "";
}

export interface DatePickerProps {
  id?: string;
  name?: string;
  /** ISO date string (YYYY-MM-DD) or empty string */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Earlier days are not selectable. Defaults to today. */
  minDate?: Date;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ id, name, value, onChange, onBlur, placeholder = "Odaberite datum", disabled, minDate, className }, ref) => {
    const today = React.useMemo(() => {
      const t = new Date();
      return { year: t.getFullYear(), month: t.getMonth(), day: t.getDate() };
    }, []);
    const min = React.useMemo(() => {
      const d = minDate ?? new Date();
      return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
    }, [minDate]);

    const selected = parseISO(value);
    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState({
      year: (selected ?? today).year,
      month: (selected ?? today).month,
    });
    const containerRef = React.useRef<HTMLDivElement>(null);
    const dialogId = React.useId();

    const isBeforeMin = (y: number, m: number, d: number) =>
      toISO(y, m, d) < toISO(min.year, min.month, min.day);

    const canGoPrev = view.year * 12 + view.month > min.year * 12 + min.month;

    const shiftMonth = (delta: number) =>
      setView((v) => {
        const total = v.year * 12 + v.month + delta;
        return { year: Math.floor(total / 12), month: total % 12 };
      });

    const openCalendar = () => {
      const base = selected ?? today;
      setView({ year: base.year, month: base.month });
      setOpen(true);
    };

    const choose = (y: number, m: number, d: number) => {
      onChange(toISO(y, m, d));
      setOpen(false);
    };

    React.useEffect(() => {
      if (!open) return;
      const handlePointerDown = (e: PointerEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          setOpen(false);
          onBlur?.();
        }
      };
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, onBlur]);

    // Monday-first grid: leading blanks, then the days of the month
    const firstWeekday = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array.from({ length: firstWeekday }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
      <div ref={containerRef} className="relative">
        {name && <input type="hidden" name={name} value={value} />}
        <button
          type="button"
          id={id}
          ref={ref}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openCalendar())}
          onBlur={() => {
            if (!open) onBlur?.();
          }}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-4 py-2 pr-3 text-left text-base transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">{selected ? formatDisplay(value) : placeholder}</span>
          <Calendar className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        </button>

        {open && (
          <div
            id={dialogId}
            role="dialog"
            aria-label="Odabir datuma"
            className="absolute right-0 top-full z-50 mt-2 w-72 max-w-full rounded-xl border border-white/10! bg-[rgb(var(--page-dark))] p-3 shadow-2xl shadow-black/50 animate-fade-in"
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canGoPrev}
                aria-label="Prethodni mjesec"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-base font-semibold text-white">
                {MONTHS[view.month]} {view.year}.
              </div>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Sljedeći mjesec"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((day) => (
                <div key={day} className="py-1 text-xs font-medium text-white/50">
                  {day}
                </div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`blank-${i}`} />;
                const isSelected =
                  !!selected && selected.year === view.year && selected.month === view.month && selected.day === day;
                const isToday = today.year === view.year && today.month === view.month && today.day === day;
                const isDisabled = isBeforeMin(view.year, view.month, day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => choose(view.year, view.month, day)}
                    aria-label={`${day}. ${MONTHS[view.month]} ${view.year}.`}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-lg text-sm transition-colors",
                      "disabled:cursor-not-allowed disabled:text-white/20",
                      isSelected
                        ? "bg-primary font-semibold text-white"
                        : "text-white/85 hover:bg-primary/20 disabled:hover:bg-transparent",
                      isToday && !isSelected && "border border-primary/60"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="rounded-md px-2 py-1 text-white/60 transition-colors hover:text-white"
              >
                Očisti
              </button>
              <button
                type="button"
                disabled={isBeforeMin(today.year, today.month, today.day)}
                onClick={() => choose(today.year, today.month, today.day)}
                className="rounded-md px-2 py-1 font-medium text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Danas
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
