"use client";

import { useState } from "react";
import { LaptopMockup } from "./mockups/LaptopMockup";
import { PhoneMockup } from "./mockups/PhoneMockup";

type Tab = "web" | "mobile";

export function CrossPlatformDisplay() {
  const [tab, setTab] = useState<Tab>("web");

  return (
    <div>
      <div className="hidden items-center justify-center md:flex md:py-10">
        <div className="relative w-full max-w-[640px]">
          <LaptopMockup />
          <div className="absolute -bottom-10 -right-6 lg:-right-14">
            <PhoneMockup />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="mb-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setTab("web")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              tab === "web"
                ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "border border-[var(--border)] text-[var(--text-2)]"
            }`}
          >
            Interface Web
          </button>
          <button
            type="button"
            onClick={() => setTab("mobile")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              tab === "mobile"
                ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "border border-[var(--border)] text-[var(--text-2)]"
            }`}
          >
            Interface Mobile
          </button>
        </div>

        <div className="flex justify-center transition-opacity duration-300">
          {tab === "web" ? <LaptopMockup /> : <PhoneMockup />}
        </div>
      </div>
    </div>
  );
}
