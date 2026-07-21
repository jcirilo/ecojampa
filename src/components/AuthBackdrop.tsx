/**
 * Decorative coastal backdrop for the auth screens (login, signup, recover).
 * Purely visual — sits behind the form content and is ignored by pointer events.
 * Place as the first child of a `relative isolate overflow-hidden` container.
 */
export function AuthBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* soft wash from the top */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/12 to-transparent" />

      {/* ambient light blobs — ocean teal + coral (gently drifting) */}
      <div className="eco-drift absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
      <div
        className="eco-drift absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-coral/20 blur-3xl"
        style={{ animationDuration: "20s", animationDelay: "-6s" }}
      />
      <div
        className="eco-drift absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-status-vandalism/15 blur-3xl"
        style={{ animationDuration: "24s", animationDelay: "-12s" }}
      />

      {/* coastline wave at the bottom — teal "water" behind, coral "sand" in front */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full text-primary/35"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M0 60 C60 20 120 100 200 70 C280 40 340 90 400 55 L400 120 L0 120 Z"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0 60 C60 20 120 100 200 70 C280 40 340 90 400 55 L400 120 L0 120 Z;
              M0 55 C70 30 120 80 200 75 C280 55 340 85 400 60 L400 120 L0 120 Z;
              M0 60 C60 20 120 100 200 70 C280 40 340 90 400 55 L400 120 L0 120 Z
            "
          />
        </path>
        <path
          fill="currentColor"
          d="M0 85 C70 55 130 110 210 88 C300 63 350 105 400 82 L400 120 L0 120 Z"
        >
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M0 85 C70 55 130 110 210 88 C300 63 350 105 400 82 L400 120 L0 120 Z;
              M0 80 C60 65 140 95 210 90 C290 70 360 95 400 78 L400 120 L0 120 Z;
              M0 85 C70 55 130 110 210 88 C300 63 350 105 400 82 L400 120 L0 120 Z
            "
          />
        </path>
        {/* <path d="M0 60 C60 20 120 100 200 70 C280 40 340 90 400 55 L400 120 L0 120 Z" /> */}
        {/* <path className="text-coral/45" fill="currentColor" d="M0 85 C70 55 130 110 210 88 C300 63 350 105 400 82 L400 120 L0 120 Z"/> */}
      </svg>
    </div>
  );
}
