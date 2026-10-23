"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    { id, name, value, onChange, onBlur, options, placeholder, disabled, className, "aria-invalid": ariaInvalid },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listId = React.useId();

    const selectedIndex = options.findIndex((o) => o.value === value);
    const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

    const openList = () => {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
      setOpen(true);
    };

    const closeList = () => setOpen(false);

    const choose = (index: number) => {
      onChange(options[index].value);
      closeList();
    };

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;
      const handlePointerDown = (e: PointerEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          closeList();
          onBlur?.();
        }
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [open, onBlur]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) openList();
          else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) openList();
          else setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Home":
          if (open) {
            e.preventDefault();
            setActiveIndex(0);
          }
          break;
        case "End":
          if (open) {
            e.preventDefault();
            setActiveIndex(options.length - 1);
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!open) openList();
          else if (activeIndex >= 0) choose(activeIndex);
          break;
        case "Escape":
          if (open) {
            e.preventDefault();
            closeList();
          }
          break;
        case "Tab":
          if (open) closeList();
          break;
      }
    };

    return (
      <div ref={containerRef} className="relative">
        {name && <input type="hidden" name={name} value={value} />}
        <button
          type="button"
          id={id}
          ref={ref}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          onClick={() => (open ? closeList() : openList())}
          onKeyDown={handleKeyDown}
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
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronDown
            className={cn(
              "ml-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-xl border border-white/10! bg-[rgb(var(--page-dark))] p-1.5 shadow-2xl shadow-black/50 animate-fade-in"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActiveIndex(index)}
                  onClick={() => choose(index)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base transition-colors",
                    isActive ? "bg-primary/20 text-white" : "text-white/80",
                    isSelected && "font-semibold text-primary"
                  )}
                >
                  {option.label}
                  {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
