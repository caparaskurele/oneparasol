import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import KnowledgeHubDropdown from "./KnowledgeHubDropdown";

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        window.clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  function handleMouseEnter() {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setOpen(true);
  }

  function handleMouseLeave() {
    // small delay to allow pointer to move into dropdown
    hoverTimeout.current = window.setTimeout(() => setOpen(false), 150);
  }

  function handleToggleClick() {
    setOpen((v) => !v);
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="One Parasol" width={36} height={36} />
            <span className="font-semibold text-lg">One Parasol</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-700 hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-sm text-gray-700 hover:underline">
            About
          </Link>

          {/* Knowledge Hub dropdown wrapper: hover + focus friendly */}
          <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            className="relative"
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={handleToggleClick}
              className="text-sm text-gray-700 hover:underline"
            >
              Knowledge Hub
            </button>

            {open && (
              <div
                // ensure clicks pass through and dropdown appears above overlays
                className="absolute right-0 mt-2"
                style={{ zIndex: 9999, pointerEvents: "auto" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <KnowledgeHubDropdown />
              </div>
            )}
          </div>

          <Link href="/blogs" className="text-sm text-gray-700 hover:underline">
            Blogs
          </Link>
          <Link href="/offerings" className="text-sm text-gray-700 hover:underline">
            Offerings
          </Link>
        </nav>
      </div>
    </header>
  );
}